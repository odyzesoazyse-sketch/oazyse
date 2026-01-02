import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookCoverRu from '@/assets/book-cover-ru.png';
import bookCoverEn from '@/assets/book-cover-en.png';
import { supabase } from '@/integrations/supabase/client';
import NewsViewer from '@/components/NewsViewer';
import SocialProof from '@/components/SocialProof';
import { Brain, Zap, GraduationCap, Sparkles } from 'lucide-react';

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
    <div className="px-4 py-5 max-w-2xl mx-auto space-y-4">
      {/* Quiz Banner */}
      <section 
        onClick={() => navigate('/quiz')}
        className="px-4 py-3 border border-neon-purple/30 rounded cursor-pointer hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-green text-white flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium">Экспресс-анализ</h2>
              <span className="text-[9px] uppercase tracking-[0.12em] text-neon-green">бесплатно</span>
            </div>
            <p className="text-xs text-muted-foreground">Персональные рекомендации от AI</p>
          </div>
          <span className="text-neon-purple group-hover:translate-x-1 group-hover:text-neon-green transition-all text-lg">→</span>
        </div>
      </section>

      {/* Book Section - Mobile Optimized */}
      <section className="p-3 md:p-4 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all">
        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground block mb-2">{t('home.featured')}</span>
        <div className="flex gap-3 md:gap-4 items-start">
          <div className="w-20 md:w-28 flex-shrink-0 p-[1px] rounded bg-gradient-to-br from-neon-green via-neon-green/60 to-neon-purple/40">
            <img src={bookCover} alt="" className="w-full h-auto rounded block" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm md:text-base font-medium lowercase leading-tight">{t('home.book.title')}</h1>
            <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
              <span>{t('home.book.author')}</span>
              <span>•</span>
              <span>2026</span>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed mt-1.5 md:mt-2 line-clamp-2 md:line-clamp-none">{t('home.book.descriptionPart1')}</p>
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
              <button
                onClick={() => setSelectedFormat('physical')}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.05em] md:tracking-[0.08em] border transition-colors rounded ${
                  selectedFormat === 'physical' 
                    ? 'bg-neon-purple text-white border-neon-purple' 
                    : 'border-border hover:border-neon-purple'
                }`}
              >
                {t('home.book.physical')}
              </button>
              <button
                onClick={() => setSelectedFormat('digital')}
                className={`px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.05em] md:tracking-[0.08em] border transition-colors rounded ${
                  selectedFormat === 'digital' 
                    ? 'bg-neon-green text-white border-neon-green' 
                    : 'border-border hover:border-neon-green'
                }`}
              >
                {t('home.book.digital')}
              </button>
              <button
                onClick={handlePurchase}
                className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-neon-green to-neon-purple text-white text-[9px] md:text-[10px] uppercase tracking-[0.05em] md:tracking-[0.08em] rounded transition-opacity hover:opacity-90 ml-auto"
              >
                {t('home.book.buyButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Recommendation Section */}
      <section className="p-3 md:p-4 border border-neon-green/30 rounded hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.15)] transition-all">
        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground block mb-2">{t('home.featured')}</span>
        <div className="flex gap-3 md:gap-4 items-start">
          <div className="w-20 md:w-28 flex-shrink-0 p-[1px] rounded bg-gradient-to-br from-neon-purple via-neon-purple/60 to-neon-green/40 flex items-center justify-center aspect-[3/4]">
            <Sparkles className="w-8 h-8 text-neon-green" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm md:text-base font-medium lowercase leading-tight">сессия с создателем</h1>
            <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
              <span>Адизель Оазис</span>
              <span>•</span>
              <span className="text-neon-green">100% гарантия</span>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed mt-1.5 md:mt-2 line-clamp-2 md:line-clamp-none">
              Персональная сессия метафракталлизма с основателем метода. Глубинная трансформация сознания.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
              <span className="text-[9px] md:text-[10px] text-neon-purple">Возврат средств при отсутствии результата</span>
              <button
                onClick={() => navigate('/oazyse')}
                className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-neon-purple to-neon-green text-white text-[9px] md:text-[10px] uppercase tracking-[0.05em] md:tracking-[0.08em] rounded transition-opacity hover:opacity-90 ml-auto"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {/* Metahuman Card */}
        <section 
          onClick={() => navigate('/metahuman')}
          className="p-4 border border-neon-green/30 rounded cursor-pointer hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.15)] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green via-neon-purple to-neon-green text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium">мета-человек</h2>
              <p className="text-xs text-muted-foreground">Стань создателем своей реальности через метод метафракталлизма</p>
            </div>
            <span className="text-neon-green group-hover:translate-x-1 transition-all text-lg">→</span>
          </div>
        </section>

        {/* Institute Card */}
        <section 
          onClick={() => navigate('/institute')}
          className="p-4 border border-neon-purple/30 rounded cursor-pointer hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-green text-white flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium leading-[1.05]">институт сознания космического разума</h2>
              <p className="text-xs text-muted-foreground">Обучение и сертификация практиков метафракталлизма</p>
            </div>
            <span className="text-neon-purple group-hover:translate-x-1 transition-all text-lg">→</span>
          </div>
        </section>

        {/* Oazyse Card */}
        <section 
          onClick={() => navigate('/oazyse')}
          className="p-4 border border-neon-green/30 rounded cursor-pointer hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.15)] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-purple text-white flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium">oazyse°</h2>
              <p className="text-xs text-muted-foreground">Платформа сознания и трансформации</p>
            </div>
            <span className="text-neon-green group-hover:translate-x-1 transition-all text-lg">→</span>
          </div>
        </section>
      </div>

      {/* News */}
      <section className="p-4 border border-neon-purple/30 rounded hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.15)] transition-all">
        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground block mb-2">{t('home.news.title')}</span>
        
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t('home.news.empty') || 'No news yet'}</p>
        ) : (
          <div className="space-y-2">
            {news.map((article, index) => (
              <div
                key={article.id}
                onClick={() => setSelectedIndex(index)}
                className="py-2 border-b border-border/50 cursor-pointer hover:border-neon-purple transition-all group last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground group-hover:text-neon-green transition-colors">{formatDate(article.created_at)}</span>
                  <h3 className="text-sm group-hover:text-neon-purple transition-colors truncate">{article.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{article.preview}</p>
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
