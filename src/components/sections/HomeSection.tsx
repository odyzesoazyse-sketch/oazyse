import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Share2, Copy, MessageCircle } from 'lucide-react';
import bookCover from '@/assets/book-cover.png';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface NewsArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
  created_at: string;
}

const HomeSection = () => {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, preview, content, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  const handlePurchase = () => {
    window.open('https://example.com/payment', '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: t('home.news.copied') });
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(selectedArticle?.title || '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleShareNative = async () => {
    if (navigator.share && selectedArticle) {
      try {
        await navigator.share({
          title: selectedArticle.title,
          text: selectedArticle.preview,
          url: window.location.href,
        });
      } catch (err) {
        // Share cancelled
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-24">
      {/* Book */}
      <section className="space-y-8">
        <span className="label">{t('home.featured')}</span>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img src={bookCover} alt="" className="w-32 md:w-40 bg-muted" />
          
          <div className="space-y-6 flex-1">
            <h1 className="title">{t('home.book.title')}</h1>
            <p className="body">{t('home.book.description')}</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFormat('physical')}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                  selectedFormat === 'physical' ? 'bg-foreground text-background' : 'border-border hover:border-foreground'
                }`}
              >
                {t('home.book.physical')}
              </button>
              <button
                onClick={() => setSelectedFormat('digital')}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                  selectedFormat === 'digital' ? 'bg-foreground text-background' : 'border-border hover:border-foreground'
                }`}
              >
                {t('home.book.digital')}
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-xl font-light">
                {selectedFormat === 'digital' ? t('home.book.priceDigital') : t('home.book.pricePhysical')}
              </span>
              <button
                onClick={handlePurchase}
                disabled={!selectedFormat}
                className="px-6 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.15em] disabled:opacity-30"
              >
                {t('home.book.buyButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="space-y-6">
        <span className="label">{t('home.news.title')}</span>
        
        <div className="space-y-4">
          {loading ? (
            <p className="body">Loading...</p>
          ) : news.length === 0 ? (
            <p className="body">{t('home.news.empty') || 'No news yet'}</p>
          ) : (
            news.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="py-4 border-b border-border cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="label">{formatDate(article.created_at)}</span>
                <h3 className="mt-2 text-sm">{article.title}</h3>
                <p className="mt-2 body line-clamp-2">{article.preview}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* News Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <span className="label">{selectedArticle && formatDate(selectedArticle.created_at)}</span>
            <DialogTitle className="text-lg mt-2">{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          
          <p className="body whitespace-pre-wrap">{selectedArticle?.content}</p>
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-border hover:border-foreground transition-colors"
            >
              <Copy className="w-3 h-3" />
              {t('home.news.copy')}
            </button>
            <button
              onClick={handleShareTelegram}
              className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-border hover:border-foreground transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Telegram
            </button>
            {navigator.share && (
              <button
                onClick={handleShareNative}
                className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.15em] border border-border hover:border-foreground transition-colors"
              >
                <Share2 className="w-3 h-3" />
                {t('home.news.share')}
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeSection;
