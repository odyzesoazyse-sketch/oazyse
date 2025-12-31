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
    window.open('https://example.com/payment', '_blank');
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
      <section className="p-4 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all space-y-3">
        <span className="label">{t('home.featured')}</span>
        
        <div className="flex gap-2 md:gap-3">
          {/* Book image with thin green gradient frame */}
          <div className="relative flex-shrink-0 p-[2px] rounded bg-gradient-to-br from-neon-green via-neon-green/60 to-neon-purple/40">
            <img src={bookCover} alt="" className="w-28 md:w-40 rounded" />
          </div>
          
          <div className="flex flex-col justify-start gap-1 flex-1 min-w-0">
            <h1 className="text-[11px] md:text-sm font-medium lowercase leading-tight">{t('home.book.title')}</h1>
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] text-muted-foreground">
              <span>{t('home.book.author')}</span>
              <span>•</span>
              <span>2026</span>
            </div>
            <p className="text-[8px] md:text-[10px] text-muted-foreground leading-tight mt-1">{t('home.book.descriptionPart1')} {t('home.book.descriptionPart2')}</p>
          </div>
        </div>
        
        {/* Fixed button row - no wrapping, no movement */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFormat('physical')}
              className={`px-2 md:px-3 py-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.08em] border transition-colors rounded whitespace-nowrap ${
                selectedFormat === 'physical' 
                  ? 'bg-neon-purple text-white border-neon-purple' 
                  : 'border-border hover:border-neon-purple hover:text-neon-purple'
              }`}
            >
              {t('home.book.physical')}
            </button>
            <button
              onClick={() => setSelectedFormat('digital')}
              className={`px-2 md:px-3 py-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.08em] border transition-colors rounded whitespace-nowrap ${
                selectedFormat === 'digital' 
                  ? 'bg-neon-green text-white border-neon-green' 
                  : 'border-border hover:border-neon-green hover:text-neon-green'
              }`}
            >
              {t('home.book.digital')}
            </button>
            <span className="text-sm md:text-base font-medium text-neon-green">$35</span>
          </div>
          <button
            onClick={handlePurchase}
            disabled={!selectedFormat}
            className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-neon-green to-neon-purple text-white text-[8px] md:text-[9px] uppercase tracking-[0.08em] disabled:opacity-30 rounded transition-opacity whitespace-nowrap"
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
