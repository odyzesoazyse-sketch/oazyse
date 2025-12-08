import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const NewsSection = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const articles = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content' },
  ];

  const getPreview = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="space-y-6">
      {articles.map((article, index) => {
        const isExpanded = expandedId === article.id;
        const content = t(article.contentKey);
        
        return (
          <article 
            key={article.id} 
            onClick={() => setExpandedId(isExpanded ? null : article.id)}
            className="content-card cursor-pointer group animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="w-6 h-px bg-border" />
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
