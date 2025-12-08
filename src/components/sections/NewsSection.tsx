import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const NewsSection = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const articles = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content' },
  ];

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <article 
          key={article.id} 
          onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
          className={`
            group cursor-pointer p-6 -mx-4 
            border-b border-border/30 
            hover:bg-muted/30 transition-all duration-300
            animate-fade-up
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-muted-foreground tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-8 h-px bg-border" />
                <span className="text-[10px] text-muted-foreground tracking-wide">
                  {t(article.dateKey)}
                </span>
              </div>
              
              <h2 className="text-sm md:text-base font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                {t(article.titleKey)}
              </h2>
              
              <div className={`overflow-hidden transition-all duration-500 ${
                expandedId === article.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-sm leading-relaxed text-muted-foreground font-serif pt-2">
                  {t(article.contentKey)}
                </p>
              </div>
            </div>
            
            <div className={`
              flex items-center justify-center w-8 h-8 
              border border-border/50 rounded-full
              group-hover:bg-foreground group-hover:text-background
              transition-all duration-300
              ${expandedId === article.id ? 'rotate-45' : ''}
            `}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsSection;
