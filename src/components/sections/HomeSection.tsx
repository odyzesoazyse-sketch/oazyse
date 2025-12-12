import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookCover from '@/assets/book-cover.png';
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
  const { t } = useTranslation();
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
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-24">
      {/* Quiz Banner */}
      <section 
        onClick={() => navigate('/quiz')}
        className="p-6 border border-neon-purple/30 rounded-lg cursor-pointer hover:border-neon-purple hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.2)] transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-4 relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-green text-white flex items-center justify-center shadow-[0_0_20px_hsl(var(--neon-purple)/0.4)]">
            <Brain className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green font-medium">БЕСПЛАТНО</span>
            <h2 className="text-lg font-medium mt-1">Экспресс-анализ</h2>
            <p className="body mt-1">Пройдите короткий тест и получите персональные рекомендации от AI</p>
          </div>
          <span className="text-neon-purple group-hover:translate-x-1 group-hover:text-neon-green transition-all">→</span>
        </div>
      </section>

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
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-all rounded ${
                  selectedFormat === 'physical' 
                    ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_15px_hsl(var(--neon-purple)/0.4)]' 
                    : 'border-border hover:border-neon-purple hover:text-neon-purple'
                }`}
              >
                {t('home.book.physical')}
              </button>
              <button
                onClick={() => setSelectedFormat('digital')}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-all rounded ${
                  selectedFormat === 'digital' 
                    ? 'bg-neon-green text-white border-neon-green shadow-[0_0_15px_hsl(var(--neon-green)/0.4)]' 
                    : 'border-border hover:border-neon-green hover:text-neon-green'
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
                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-green text-white text-[10px] uppercase tracking-[0.15em] disabled:opacity-30 rounded hover:shadow-[0_0_25px_hsl(var(--neon-purple)/0.5)] transition-all"
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
