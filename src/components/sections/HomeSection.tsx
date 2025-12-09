import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
    const paymentUrl = 'https://example.com/payment';
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Book Section */}
      <section className="relative px-6 md:px-12 lg:px-24 py-12 md:py-24 animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Book Cover */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-8 -left-8 yeezy-number opacity-10 pointer-events-none">
              01
            </div>
            <div className="relative aspect-book max-w-sm mx-auto lg:mx-0 bg-card overflow-hidden group">
              <img 
                src={bookCover} 
                alt={t('home.book.title')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/5 mix-blend-multiply" />
            </div>
          </div>

          {/* Book Info */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="yeezy-label text-muted-foreground block">
                {t('home.featured')}
              </span>
              <h1 className="font-display text-huge tracking-tight">
                {t('home.book.title')}
              </h1>
              <p className="yeezy-body text-muted-foreground max-w-md">
                {t('home.book.description')}
              </p>
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <span className="yeezy-label text-muted-foreground block">
                {t('home.book.selectFormat')}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFormat('physical')}
                  className={`yeezy-btn-outline ${
                    selectedFormat === 'physical' ? 'bg-foreground text-background' : ''
                  }`}
                >
                  {t('home.book.physical')}
                </button>
                <button
                  onClick={() => setSelectedFormat('digital')}
                  className={`yeezy-btn-outline ${
                    selectedFormat === 'digital' ? 'bg-foreground text-background' : ''
                  }`}
                >
                  {t('home.book.digital')}
                </button>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-8">
              <div className="font-display text-display">
                {selectedFormat === 'digital' ? t('home.book.priceDigital') : t('home.book.pricePhysical')}
              </div>
              <button
                onClick={handlePurchase}
                disabled={!selectedFormat}
                className="yeezy-btn disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {t('home.book.buyButton')}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="yeezy-divider mx-6 md:mx-12 lg:mx-24" />

      {/* Promotions */}
      <section className="px-6 md:px-12 lg:px-24 py-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-baseline gap-6 mb-8">
          <span className="yeezy-label">{t('home.promotions.title')}</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        
        <div className="yeezy-card hover:bg-muted transition-colors cursor-pointer group">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4 flex-1">
              <h3 className="font-display text-display tracking-tight">
                {t('home.promotions.item1.title')}
              </h3>
              <p className="yeezy-body text-muted-foreground max-w-2xl">
                {t('home.promotions.item1.description')}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </section>

      <div className="yeezy-divider mx-6 md:mx-12 lg:mx-24" />

      {/* News Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-12 pb-32 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-baseline gap-6 mb-8">
          <span className="yeezy-label">{t('home.news.title')}</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {articles.map((article, index) => {
            const isExpanded = expandedId === article.id;
            const content = t(article.contentKey);
            
            return (
              <article 
                key={article.id}
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                className={`
                  p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0
                  cursor-pointer transition-all duration-300
                  ${isExpanded ? 'bg-foreground text-background col-span-1 md:col-span-3' : 'hover:bg-muted'}
                `}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`font-display text-6xl ${isExpanded ? 'text-background/20' : 'text-muted-foreground/20'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <span className={`yeezy-label block ${isExpanded ? 'text-background/60' : 'text-muted-foreground'}`}>
                    {t(article.dateKey)}
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                    {t(article.titleKey)}
                  </h2>
                  
                  {isExpanded && (
                    <p className="yeezy-body text-background/80 pt-4 animate-slide-up">
                      {content}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeSection;