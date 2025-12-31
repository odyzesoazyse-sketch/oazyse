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
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | null>(null);
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
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-3">
      {/* Quiz Banner - Compact */}
      <section 
        onClick={() => navigate('/quiz')}
        className="px-3 py-2 border border-neon-purple/30 rounded cursor-pointer hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all group"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-green text-white flex items-center justify-center flex-shrink-0">
            <Brain className="w-3 h-3" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-medium">Экспресс-анализ</h2>
              <span className="text-[6px] uppercase tracking-[0.12em] text-neon-green">бесплатно</span>
            </div>
            <p className="text-[8px] text-muted-foreground truncate">Персональные рекомендации от AI</p>
          </div>
          <span className="text-neon-purple group-hover:translate-x-1 group-hover:text-neon-green transition-all text-xs">→</span>
        </div>
      </section>

      {/* Book */}
      <section className="p-2.5 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all">
        <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground block mb-1.5">{t('home.featured')}</span>
        
        {/* Book image full width with gradient frame */}
        <div className="p-[1px] rounded bg-gradient-to-br from-neon-green via-neon-green/60 to-neon-purple/40 mb-2">
          <img src={bookCover} alt="" className="w-full rounded block" />
        </div>
        
        {/* Text content */}
        <div className="space-y-0.5 mb-2">
          <h1 className="text-xs md:text-sm font-medium lowercase leading-tight">{t('home.book.title')}</h1>
          <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] text-muted-foreground">
            <span>{t('home.book.author')}</span>
            <span>•</span>
            <span>2026</span>
          </div>
          <p className="text-[8px] md:text-[10px] text-muted-foreground leading-snug">{t('home.book.descriptionPart1')} {t('home.book.descriptionPart2')}</p>
        </div>
        
        {/* Format buttons + buy button - all same size */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedFormat('physical')}
            className={`px-2 py-1 text-[7px] uppercase tracking-[0.08em] border transition-colors rounded ${
              selectedFormat === 'physical' 
                ? 'bg-neon-purple text-white border-neon-purple' 
                : 'border-border hover:border-neon-purple'
            }`}
          >
            {t('home.book.physical')}
          </button>
          <button
            onClick={() => setSelectedFormat('digital')}
            className={`px-2 py-1 text-[7px] uppercase tracking-[0.08em] border transition-colors rounded ${
              selectedFormat === 'digital' 
                ? 'bg-neon-green text-white border-neon-green' 
                : 'border-border hover:border-neon-green'
            }`}
          >
            {t('home.book.digital')}
          </button>
          <button
            onClick={handlePurchase}
            className="px-2 py-1 bg-gradient-to-r from-neon-green to-neon-purple text-white text-[7px] uppercase tracking-[0.08em] rounded transition-opacity hover:opacity-90 ml-auto"
          >
            {t('home.book.buyButton')}
          </button>
        </div>
      </section>

      {/* News */}
      <section className="p-2.5 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all">
        <span className="text-[6px] uppercase tracking-[0.1em] text-muted-foreground block mb-1.5">{t('home.news.title')}</span>
        
        {loading ? (
          <p className="text-[8px] text-muted-foreground">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-[8px] text-muted-foreground">{t('home.news.empty') || 'No news yet'}</p>
        ) : (
          <div className="space-y-1.5">
            {news.map((article, index) => (
              <div
                key={article.id}
                onClick={() => setSelectedIndex(index)}
                className="py-1.5 border-b border-border/50 cursor-pointer hover:border-neon-purple transition-all group last:border-b-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[6px] text-muted-foreground group-hover:text-neon-green transition-colors">{formatDate(article.created_at)}</span>
                  <h3 className="text-[9px] group-hover:text-neon-purple transition-colors truncate">{article.title}</h3>
                </div>
                <p className="text-[7px] text-muted-foreground line-clamp-1 mt-0.5">{article.preview}</p>
              </div>
            ))}
          </div>
        )}
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
