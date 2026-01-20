import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Send, MessageCircle, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Message { role: 'user' | 'assistant'; content: string; }

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hypnotherapy-chat`;

const HypnotherapyChat = () => {
  const { t } = useTranslation();
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Check if user is authenticated
    if (!session?.access_token) {
      toast({
        title: t('chat.authRequired'),
        description: t('chat.authRequiredDesc'),
        variant: 'destructive'
      });
      return;
    }
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${session.access_token}` 
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok) { 
        const errorData = await resp.json(); 
        if (resp.status === 401) {
          toast({
            title: t('chat.authRequired'),
            description: t('chat.authRequiredDesc'),
            variant: 'destructive'
          });
          return;
        }
        throw new Error(errorData.error || 'Server error'); 
      }
      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch { textBuffer = line + '\n' + textBuffer; break; }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({ title: t('chat.errorTitle'), description: error instanceof Error ? error.message : t('chat.errorMessage'), variant: 'destructive' });
    } finally { setIsLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-20 right-5 z-50 w-12 h-12 rounded-full p-0 bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em]">{t('chat.title')}</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
          className="hover:bg-muted/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        {!user ? (
          <div className="text-center py-12 animate-fade-up">
            <LogIn className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-serif italic mb-3 text-foreground">{t('chat.authRequired')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">{t('chat.authRequiredDesc')}</p>
            <Button onClick={() => navigate('/auth')} variant="outline">
              {t('chat.loginButton')}
            </Button>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 animate-fade-up">
            <p className="text-lg font-serif italic mb-3 text-foreground">{t('chat.greeting')}</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">{t('chat.prompt')}</p>
          </div>
        ) : null}
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`p-4 ${
              msg.role === 'user' 
                ? 'ml-8 bg-foreground text-background' 
                : 'mr-8 bg-muted/50 border border-border/50'
            } animate-fade-up`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="mr-8 p-4 bg-muted/50 border border-border/50 animate-fade-up">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {user && (
        <div className="p-4 border-t border-border/50 bg-background">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <Textarea 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyDown} 
              placeholder={t('chat.inputPlaceholder')} 
              className="input-elegant min-h-[48px] max-h-32 resize-none flex-1" 
              disabled={isLoading} 
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading} 
              className="btn-primary shrink-0 w-12 h-12 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HypnotherapyChat;
