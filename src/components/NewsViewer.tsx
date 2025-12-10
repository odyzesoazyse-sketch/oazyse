import { useState, useRef, useEffect, TouchEvent } from 'react';
import { X, Copy, MessageCircle, Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';

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
  const [translateY, setTranslateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (currentIndex < articles.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTranslateY(-100);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setTranslateY(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTranslateY(100);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setTranslateY(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientY;
    setTouchEnd(currentTouch);
    
    if (touchStart !== null) {
      const diff = touchStart - currentTouch;
      const percentage = (diff / window.innerHeight) * 100;
      
      // Limit drag range
      if (percentage > -30 && percentage < 30) {
        setTranslateY(-percentage);
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTranslateY(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isUpSwipe && currentIndex < articles.length - 1) {
      goToNext();
    } else if (isDownSwipe && currentIndex > 0) {
      goToPrevious();
    } else {
      setTranslateY(0);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: t('home.news.copied') });
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentArticle?.title || '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleShareNative = async () => {
    if (navigator.share && currentArticle) {
      try {
        await navigator.share({
          title: currentArticle.title,
          text: currentArticle.preview,
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating) return;
    
    if (e.deltaY > 30 && currentIndex < articles.length - 1) {
      goToNext();
    } else if (e.deltaY < -30 && currentIndex > 0) {
      goToPrevious();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={handleWheel}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:opacity-70 transition-opacity"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} / {articles.length}
        </span>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="p-2 border border-border rounded-full disabled:opacity-20 hover:bg-muted transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === articles.length - 1}
          className="p-2 border border-border rounded-full disabled:opacity-20 hover:bg-muted transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div
        className="h-full w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 max-w-3xl mx-auto"
        style={{
          transform: `translateY(${translateY}%)`,
          transition: isAnimating ? 'transform 0.3s ease-out' : 'none',
        }}
      >
        <div className="space-y-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <span className="label">{formatDate(currentArticle.created_at)}</span>
          
          <h1 className="text-2xl md:text-3xl font-light leading-tight">
            {currentArticle.title}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground whitespace-pre-wrap">
            {currentArticle.content}
          </p>

          {/* Share buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
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
        </div>

        {/* Swipe hint */}
        {articles.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-xs text-muted-foreground animate-pulse">
              {currentIndex < articles.length - 1 ? '↑ Swipe up for next' : '↓ Swipe down for previous'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsViewer;
