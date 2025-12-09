import { useTranslation } from 'react-i18next';
import { ChevronRight, Book, Sparkles, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

  const getPreview = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const handlePurchase = () => {
    // Opens payment link - replace with actual payment URL
    const paymentUrl = 'https://example.com/payment';
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="space-y-10">
      {/* Book Section */}
      <section className="animate-fade-up">
        <div className="content-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
              {t('home.featured')}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Book Cover */}
            <div className="w-40 md:w-48 flex-shrink-0 group">
              <div className="relative overflow-hidden rounded-sm shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={bookCover} 
                  alt={t('home.book.title')}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Book Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Book className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                  {t('home.book.label')}
                </span>
              </div>
              
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.1em]">
                {t('home.book.title')}
              </h2>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('home.book.description')}
              </p>
              
              {/* Format Selection */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('home.book.selectFormat')}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <button
                    onClick={() => setSelectedFormat('physical')}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300 ${
                      selectedFormat === 'physical'
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {t('home.book.physical')}
                  </button>
                  <button
                    onClick={() => setSelectedFormat('digital')}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300 ${
                      selectedFormat === 'digital'
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {t('home.book.digital')}
                  </button>
                </div>
              </div>
              
              {/* Price and Buy Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="text-xl font-bold">
                  {selectedFormat === 'digital' ? t('home.book.priceDigital') : t('home.book.pricePhysical')}
                </div>
                <Button
                  onClick={handlePurchase}
                  disabled={!selectedFormat}
                  className="group gap-2"
                >
                  {t('home.book.buyButton')}
                  <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
            {t('home.promotions.title')}
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        
        <div className="content-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] mb-2">
            {t('home.promotions.item1.title')}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('home.promotions.item1.description')}
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
            {t('home.news.title')}
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>
        
        <div className="space-y-4">
          {articles.map((article, index) => {
            const isExpanded = expandedId === article.id;
            const content = t(article.contentKey);
            
            return (
              <article 
                key={article.id} 
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                className="content-card cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="w-4 h-px bg-border" />
                      <span className="text-[10px] text-muted-foreground tracking-wider">
                        {t(article.dateKey)}
                      </span>
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'
                      }`} 
                    />
                  </div>
                  
                  <h2 className="text-xs font-semibold uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-300">
                    {t(article.titleKey)}
                  </h2>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isExpanded ? content : getPreview(content)}
                  </p>
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
