import { useState, useRef, useEffect, TouchEvent } from 'react';
import { Copy, MessageCircle, Share2, ChevronUp, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import Header from './Header';

interface NewsArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
  created_at: string;
}

interface NewsViewerProps {
  articles: NewsArticle[];
  initialIndex: number;
  onClose: () => void;
}

const NewsViewer = ({ articles, initialIndex, onClose }: NewsViewerProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;
  const currentArticle = articles[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        goToPrevious();
      } else if (e.key === 'ArrowDown' && currentIndex < articles.length - 1) {
        goToNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, articles.length, onClose]);

  const goToNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isUpSwipe && currentIndex < articles.length - 1) {
      goToNext();
    } else if (isDownSwipe && currentIndex > 0) {
      goToPrevious();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const getNewsLink = () => {
    return `${window.location.origin}/?news=${currentArticle.id}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getNewsLink());
    toast({ title: t('home.news.copied') });
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(getNewsLink());
    const text = encodeURIComponent(currentArticle?.title || '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(getNewsLink());
    const text = encodeURIComponent(currentArticle?.title || '');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const handleShareNative = async () => {
    if (navigator.share && currentArticle) {
      try {
        await navigator.share({
          title: currentArticle.title,
          text: currentArticle.preview,
          url: getNewsLink(),
        });
      } catch {
        // Share cancelled
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30 && currentIndex < articles.length - 1) {
      goToNext();
    } else if (e.deltaY < -30 && currentIndex > 0) {
      goToPrevious();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Original Header */}
      <Header />

      {/* Back button and counter */}
      <div className="pt-12 px-4 flex items-center justify-between shrink-0">
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-[8px] uppercase tracking-[0.15em] text-muted-foreground hover:text-neon-purple transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
        </button>
        <span className="text-[8px] text-muted-foreground">
          {currentIndex + 1}/{articles.length}
        </span>
      </div>

      {/* Main content area */}
      <div 
        className="flex-1 overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={handleWheel}
      >
        {/* Content */}
        <div className="h-full w-full flex flex-col px-4 md:px-12 lg:px-24 py-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full">
            {/* News card with corner borders */}
            <div className="relative p-4 md:p-6">
              {/* Corner borders */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-purple" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neon-green" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neon-green" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-purple" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-neon-purple">
                    {t('home.news.title')}
                  </span>
                  <span className="text-[8px] text-muted-foreground">{formatDate(currentArticle.created_at)}</span>
                </div>
                
                <h1 className="text-base md:text-lg font-light leading-tight">
                  {currentArticle.title}
                </h1>
                
                <div>
                  <p className="text-[11px] md:text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {currentArticle.content}
                  </p>
                </div>

                {/* Share section */}
                <div className="pt-3 border-t border-border/50">
                  <p className="text-[7px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {t('home.news.share')}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/10 transition-colors rounded-sm"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {t('home.news.copy')}
                    </button>
                    <button
                      onClick={handleShareTelegram}
                      className="flex items-center gap-1.5 px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/10 transition-colors rounded-sm"
                    >
                      <MessageCircle className="w-2.5 h-2.5" />
                      Telegram
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex items-center gap-1.5 px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 transition-colors rounded-sm"
                    >
                      <MessageCircle className="w-2.5 h-2.5" />
                      WhatsApp
                    </button>
                    {navigator.share && (
                      <button
                        onClick={handleShareNative}
                        className="flex items-center gap-1.5 px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/10 transition-colors rounded-sm"
                      >
                        <Share2 className="w-2.5 h-2.5" />
                        {t('home.news.share')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows - fixed at bottom */}
      {articles.length > 1 && (
        <div className="flex items-center justify-center gap-4 py-2 shrink-0">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-1.5 border border-neon-purple/30 rounded-full disabled:opacity-20 hover:border-neon-purple hover:bg-neon-purple/10 transition-colors"
          >
            <ChevronUp className="w-3 h-3 text-neon-purple" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === articles.length - 1}
            className="p-1.5 border border-neon-purple/30 rounded-full disabled:opacity-20 hover:border-neon-purple hover:bg-neon-purple/10 transition-colors"
          >
            <ChevronDown className="w-3 h-3 text-neon-purple" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-background border-t border-border shrink-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent animate-neon-line-pulse" />
        <div className="flex items-center justify-center gap-4 h-8 px-4">
          <a 
            href="https://t.me/oazyse" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground hover:text-neon-purple transition-colors"
          >
            Telegram
          </a>
          <span className="text-neon-purple/30">•</span>
          <a 
            href="https://instagram.com/oazyse" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground hover:text-neon-purple transition-colors"
          >
            Instagram
          </a>
          <span className="text-neon-purple/30">•</span>
          <a 
            href="https://wa.me/oazyse" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground hover:text-neon-green transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NewsViewer;