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
      <section className="space-y-2">
        <span className="label">{t('home.featured')}</span>
        
        <div className="flex gap-4">
          <img src={bookCover} alt="" className="w-36 md:w-44 bg-muted flex-shrink-0" />
          
          <div className="flex flex-col justify-between py-0.5">
            <div>
              <h1 className="text-sm font-medium lowercase leading-tight">{t('home.book.title')}</h1>
              <span className="text-[10px] text-muted-foreground block">{t('home.book.author')}</span>
              <span className="text-[10px] text-muted-foreground block">2026</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">{t('home.book.descriptionPart1')}</p>
          </div>
        </div>
        
        <p className="text-[10px] text-muted-foreground leading-snug text-justify">{t('home.book.descriptionPart2')}</p>
        
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSelectedFormat('physical')}
            className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] border transition-all rounded ${
              selectedFormat === 'physical' 
                ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_10px_hsl(var(--neon-purple)/0.4)]' 
                : 'border-border hover:border-neon-purple hover:text-neon-purple'
            }`}
          >
            {t('home.book.physical')}
          </button>
          <button
            onClick={() => setSelectedFormat('digital')}
            className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] border transition-all rounded ${
              selectedFormat === 'digital' 
                ? 'bg-neon-green text-white border-neon-green shadow-[0_0_10px_hsl(var(--neon-green)/0.4)]' 
                : 'border-border hover:border-neon-green hover:text-neon-green'
            }`}
          >
            {t('home.book.digital')}
          </button>
          <span className="text-base font-light">
            {selectedFormat === 'digital' ? t('home.book.priceDigital') : t('home.book.pricePhysical')}
          </span>
          <button
            onClick={handlePurchase}
            disabled={!selectedFormat}
            className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-green text-white text-[9px] uppercase tracking-[0.1em] disabled:opacity-30 rounded hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.5)] transition-all"
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
