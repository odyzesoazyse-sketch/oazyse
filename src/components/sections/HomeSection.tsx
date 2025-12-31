import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookCoverRu from '@/assets/book-cover-ru.png';
import bookCoverEn from '@/assets/book-cover-en.png';
import { supabase } from '@/integrations/supabase/client';
import NewsViewer from '@/components/NewsViewer';
import { Brain } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
  created_at: string;
}

const HomeSection = () => {
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';
  const bookCover = isRussian ? bookCoverRu : bookCoverEn;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
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
    navigate('/auth');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto space-y-8">
      {/* Quiz Banner - Compact */}
      <section 
        onClick={() => navigate('/quiz')}
        className="px-4 py-2.5 border border-neon-purple/30 rounded cursor-pointer hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-green text-white flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">Экспресс-анализ</h2>
              <span className="text-[8px] uppercase tracking-[0.15em] text-neon-green">бесплатно</span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate">Персональные рекомендации от AI</p>
          </div>
          <span className="text-neon-purple group-hover:translate-x-1 group-hover:text-neon-green transition-all text-sm">→</span>
        </div>
      </section>

      {/* Book */}
      <section className="p-4 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all space-y-2">
        <span className="text-[7px] uppercase tracking-[0.12em] text-muted-foreground">{t('home.featured')}</span>
        
        <div className="flex gap-3 md:gap-4">
          {/* Book image with green gradient frame matching quiz banner thickness */}
          <div className="relative flex-shrink-0 p-[1px] rounded bg-gradient-to-br from-neon-green via-neon-green/60 to-neon-purple/40">
            <img src={bookCover} alt="" className="w-28 md:w-40 rounded" />
          </div>
          
          <div className="flex flex-col justify-start gap-1.5 flex-1 min-w-0">
            <h1 className="text-sm md:text-base font-medium lowercase leading-tight">{t('home.book.title')}</h1>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground">
              <span>{t('home.book.author')}</span>
              <span>•</span>
              <span>2026</span>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed mt-1">{t('home.book.descriptionPart1')} {t('home.book.descriptionPart2')}</p>
          </div>
        </div>
        
        {/* Simple buy button */}
        <div className="pt-1">
          <button
            onClick={handlePurchase}
            className="w-full py-2 bg-gradient-to-r from-neon-green to-neon-purple text-white text-[10px] md:text-xs uppercase tracking-[0.1em] rounded transition-opacity hover:opacity-90"
          >
            {t('home.book.buyButton')}
          </button>
        </div>
      </section>

      {/* News */}
      <section className="space-y-3">
        <span className="label">{t('home.news.title')}</span>
        
        <div className="space-y-2">
          {loading ? (
            <p className="body">Loading...</p>
          ) : news.length === 0 ? (
            <p className="body">{t('home.news.empty') || 'No news yet'}</p>
          ) : (
            news.map((article, index) => (
              <div
                key={article.id}
                onClick={() => setSelectedIndex(index)}
                className="py-4 border-b border-border cursor-pointer hover:border-neon-purple transition-all group"
              >
                <span className="label group-hover:text-neon-green transition-colors">{formatDate(article.created_at)}</span>
                <h3 className="mt-2 text-sm group-hover:text-neon-purple transition-colors">{article.title}</h3>
                <p className="mt-2 body line-clamp-2">{article.preview}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Full-screen News Viewer */}
      {selectedIndex !== null && (
        <NewsViewer
          articles={news}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
};

export default HomeSection;
