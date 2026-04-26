import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LandingShell, { Divider } from '@/components/LandingShell';
import { supabase } from '@/integrations/supabase/client';
import NewsViewer from '@/components/NewsViewer';
import bookCoverRu from '@/assets/book-cover-ru.png';
import bookCoverEn from '@/assets/book-cover-en.png';

interface NewsArticle {
  id: string;
  title: string;
  preview: string;
  content: string;
  created_at: string;
}

const demoNews: NewsArticle[] = [
  {
    id: 'demo-1',
    title: 'почему oazyse выходит наружу сейчас',
    preview: 'проект перестаёт быть внутренним поиском и получает публичную форму: главную страницу, ленту, книгу и первые личные сессии.',
    content:
      'oazyse долго собирался внутри: как язык, метод, институт, книга и ощущение живой среды. сейчас всё это получает форму, которую можно показать другому человеку без лишнего шума.\n\nэта лента нужна не для контента ради контента. здесь будет видно, как оазис становится реальностью: какие формы открываются, какие тексты уточняются и что в системе появляется следующим.',
    created_at: '2026-04-20T10:00:00.000Z',
  },
  {
    id: 'demo-2',
    title: 'персональные сессии становятся первым живым форматом',
    preview: 'пока большая система собирается, личная работа с запросом остаётся самым прямым способом прикоснуться к метасинхронике.',
    content:
      'oazyse намного больше одной услуги. но первый реальный контакт с системой часто происходит через конкретный запрос: страх, отношения, деньги, потерю энергии или повторяющийся сценарий.\n\nпоэтому персональные сессии становятся первым живым форматом. не как витрина и не как обещание чудес, а как точная работа: один запрос, спокойное состояние внимания, поиск механизма и фиксация результата.',
    created_at: '2026-04-18T16:30:00.000Z',
  },
  {
    id: 'demo-3',
    title: 'книга становится первым материальным артефактом оазиса',
    preview: '«искусство вознесения» — способ держать язык оазиса в руках до того, как человек войдёт глубже.',
    content:
      'не каждый человек сразу готов к сеансу, аккаунту или долгому чтению сайта. иногда первый вход мягче: прочитать несколько страниц, почувствовать язык, заметить внутреннее движение.\n\nпоэтому книга важна не как мерч и не как рекламный объект. это первый материальный след оазиса. отдельный материал о книге, форматах и способе получить экземпляр появится в ленте позже.',
    created_at: '2026-04-15T09:15:00.000Z',
  },
];

const NewsPage = () => {
  const { i18n } = useTranslation();
  const bookCover = i18n.language === 'ru' ? bookCoverRu : bookCoverEn;
  const [news, setNews] = useState<NewsArticle[]>(demoNews);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const queryPromise = supabase
          .from('news')
          .select('id, title, preview, content, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(20);

        const timeoutPromise = new Promise<null>((resolve) => {
          setTimeout(() => resolve(null), 1800);
        });

        const result = await Promise.race([queryPromise, timeoutPromise]);

        if (result && !result.error && result.data && result.data.length > 0) {
          setNews(result.data);
        }
      } catch {
        // Keep demo news visible if the backend is unavailable.
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <LandingShell>
      <section className="l-hero" style={{ minHeight: '34vh', paddingTop: '7rem' }}>
        <div data-reveal>
          <h1 className="l-hero-title">лента</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">живые следы того, как oazyse становится реальностью.</p>
      </section>

      <Divider />
      <section className="l-section" style={{ paddingTop: '4rem' }}>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }} data-reveal data-delay="1">
          <div className="l-card" style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '1.25rem', alignItems: 'center' }}>
            <img src={bookCover} alt="Искусство вознесения" style={{ width: '96px', borderRadius: '14px', border: '1px solid hsl(var(--border)/0.7)' }} />
            <div>
              <span className="l-mono" style={{ color: 'hsl(var(--neon-purple))' }}>книга</span>
              <h2 style={{ marginTop: '0.55rem', marginBottom: '0.55rem', fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.25 }}>
                «искусство вознесения»
              </h2>
              <p className="l-text" style={{ fontSize: '0.8rem', marginBottom: 0 }}>
                спокойный материальный след оазиса. позже здесь появится отдельный текст о книге, форматах и способе получить экземпляр.
              </p>
            </div>
          </div>

          <Link to="/session" className="l-card" style={{ textDecoration: 'none' }}>
            <span className="l-mono" style={{ color: 'hsl(var(--neon-green))' }}>метод</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.2 }}>
              если чтение отозвалось, можно ближе понять, как наш метод работает с подсознанием.
            </h2>
              <p className="l-text" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              это мягкий следующий шаг для тех, кто хочет не просто читать, а прикоснуться к работе метода вживую.
              </p>
            <span className="l-btn-ghost">к методу →</span>
          </Link>
        </div>

        {loading && (
          <p className="l-text" data-reveal>обновляем ленту…</p>
        )}
        {news.length === 0 ? (
          <p className="l-text" data-reveal>здесь появятся первые записи, когда будут опубликованы материалы.</p>
        ) : (
          <div data-reveal data-delay="1">
            {news.map((article, index) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="w-full text-left py-4 border-b border-border/60 transition-colors hover:border-neon-purple group"
              >
                <span className="block text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground/55 mb-2">
                  {formatDate(article.created_at)}
                </span>
                <h2 className="text-sm md:text-base text-foreground group-hover:text-neon-purple transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {article.preview}
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedIndex !== null && (
        <NewsViewer
          articles={news}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </LandingShell>
  );
};

export default NewsPage;
