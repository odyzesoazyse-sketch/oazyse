import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Share2, Copy, MessageCircle } from 'lucide-react';
import bookCover from '@/assets/book-cover.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Article {
  id: number;
  titleKey: string;
  dateKey: string;
  contentKey: string;
  previewKey: string;
}

const HomeSection = () => {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | null>(null);

  const articles: Article[] = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content', previewKey: 'news.article1.preview' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content', previewKey: 'news.article2.preview' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content', previewKey: 'news.article3.preview' },
  ];

  const handlePurchase = () => {
    window.open('https://example.com/payment', '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: t('home.news.copied') });
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(selectedArticle ? t(selectedArticle.titleKey) : '');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const handleShareNative = async () => {
    if (navigator.share && selectedArticle) {
      try {
        await navigator.share({
          title: t(selectedArticle.titleKey),
          text: t(selectedArticle.previewKey),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
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
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="py-4 border-b border-border cursor-pointer hover:opacity-70 transition-opacity"
            >
              <span className="label">{t(article.dateKey)}</span>
              <h3 className="mt-2 text-sm">{t(article.titleKey)}</h3>
              <p className="mt-2 body line-clamp-2">{t(article.previewKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <span className="label">{selectedArticle && t(selectedArticle.dateKey)}</span>
            <DialogTitle className="text-lg mt-2">{selectedArticle && t(selectedArticle.titleKey)}</DialogTitle>
          </DialogHeader>
          
          <p className="body">{selectedArticle && t(selectedArticle.contentKey)}</p>
          
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