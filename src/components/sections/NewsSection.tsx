import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const NewsSection = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const articles = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content' },
  ];

  const getPreview = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="space-y-4">
      {articles.map((article, index) => {
        const isExpanded = expandedId === article.id;
        const content = t(article.contentKey);
        
        return (
          <article 
            key={article.id} 
            onClick={() => setExpandedId(isExpanded ? null : article.id)}
            className={`
              group cursor-pointer p-5 
              border border-border/40 
              hover:border-border transition-all duration-300
              animate-fade-up
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground tracking-wide">
                  {t(article.dateKey)}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              
              <h2 className="text-xs font-semibold uppercase tracking-widest">
                {t(article.titleKey)}
              </h2>
              
              <p className="text-sm leading-relaxed text-muted-foreground font-serif">
                {isExpanded ? content : getPreview(content)}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NewsSection;
