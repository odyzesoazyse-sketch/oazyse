import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import bookCover from '@/assets/book-cover.png';

const HomeSection = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | null>(null);

  const articles = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content' },
  ];

  const handlePurchase = () => {
    window.open('https://example.com/payment', '_blank');
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
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            return (
              <div
                key={article.id}
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                className="py-4 border-b border-border cursor-pointer"
              >
                <span className="label">{t(article.dateKey)}</span>
                <h3 className="mt-2 text-sm">{t(article.titleKey)}</h3>
                {isExpanded && (
                  <p className="mt-3 body animate-fade-in">{t(article.contentKey)}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeSection;