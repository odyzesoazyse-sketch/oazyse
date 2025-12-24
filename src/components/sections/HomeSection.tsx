import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookCover from '@/assets/book-cover.png';
import { supabase } from '@/integrations/supabase/client';
import NewsViewer from '@/components/NewsViewer';
import { Brain, ArrowRight, Sparkles, BookOpen, Newspaper } from 'lucide-react';

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
  const navigate = useNavigate();

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

  return (
    <div className="px-4 md:px-6 py-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-xs font-medium text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Метод Трансформации Сознания</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
          Станьте <span className="text-gradient">Метачеловеком</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          100% гарантия трансформации сознания через революционный метод Метасинка
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => navigate('/metahuman')}
            className="btn-accent"
          >
            Узнать больше
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/quiz')}
            className="btn-ghost"
          >
            Пройти тест
          </button>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Что вы получите</h2>
          <span className="text-xs text-secondary font-medium">БЕСПЛАТНО</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Quiz Card */}
          <div 
            onClick={() => navigate('/quiz')}
            className="feature-card cursor-pointer group"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Brain className="w-16 h-16 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">Экспресс-анализ</h3>
              <p className="feature-card-description">
                Пройдите короткий тест и получите персональные рекомендации от AI
              </p>
            </div>
          </div>

          {/* Metahuman Card */}
          <div 
            onClick={() => navigate('/metahuman')}
            className="feature-card cursor-pointer group"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-secondary group-hover:scale-110 transition-transform" />
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">Метод Метасинка</h3>
              <p className="feature-card-description">
                Революционная технология калибровки сознания с гарантией результата
              </p>
            </div>
          </div>

          {/* Book Card */}
          <div className="feature-card group">
            <div className="aspect-[16/10] bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src={bookCover} 
                alt="Book" 
                className="h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">{t('home.book.title')}</h3>
              <p className="feature-card-description line-clamp-2">
                {t('home.book.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Purchase Section */}
      <section className="feature-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img 
            src={bookCover} 
            alt="" 
            className="w-40 md:w-48 rounded-lg shadow-2xl"
          />
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="label">{t('home.featured')}</span>
              <h2 className="text-2xl md:text-3xl font-bold">{t('home.book.title')}</h2>
            </div>
            <p className="text-muted-foreground">{t('home.book.description')}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => setSelectedFormat('physical')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedFormat === 'physical' 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--neon-purple)/0.4)]' 
                    : 'border border-border hover:border-primary hover:text-primary'
                }`}
              >
                {t('home.book.physical')}
              </button>
              <button
                onClick={() => setSelectedFormat('digital')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedFormat === 'digital' 
                    ? 'bg-secondary text-secondary-foreground shadow-[0_0_20px_hsl(var(--neon-green)/0.4)]' 
                    : 'border border-border hover:border-secondary hover:text-secondary'
                }`}
              >
                {t('home.book.digital')}
              </button>
            </div>
            
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <span className="text-2xl font-bold">
                {selectedFormat === 'digital' ? t('home.book.priceDigital') : t('home.book.pricePhysical')}
              </span>
              <button
                onClick={handlePurchase}
                disabled={!selectedFormat}
                className="btn-accent disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('home.book.buyButton')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-secondary" />
          <h2 className="text-xl font-semibold">{t('home.news.title')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <div className="feature-card p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>
          ) : news.length === 0 ? (
            <div className="feature-card p-6 col-span-full text-center">
              <p className="text-muted-foreground">{t('home.news.empty') || 'No news yet'}</p>
            </div>
          ) : (
            news.map((article, index) => (
              <div
                key={article.id}
                onClick={() => setSelectedIndex(index)}
                className="feature-card p-5 cursor-pointer group"
              >
                <span className="text-xs text-muted-foreground">{formatDate(article.created_at)}</span>
                <h3 className="mt-2 font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.preview}</p>
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