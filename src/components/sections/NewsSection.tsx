import { useTranslation } from 'react-i18next';

const NewsSection = () => {
  const { t } = useTranslation();

  const articles = [
    { id: 1, titleKey: 'news.article1.title', dateKey: 'news.article1.date', contentKey: 'news.article1.content' },
    { id: 2, titleKey: 'news.article2.title', dateKey: 'news.article2.date', contentKey: 'news.article2.content' },
    { id: 3, titleKey: 'news.article3.title', dateKey: 'news.article3.date', contentKey: 'news.article3.content' },
  ];

  return (
    <div className="space-y-12">
      {articles.map((article) => (
        <article key={article.id} className="space-y-2">
          <h2 className="font-bold uppercase text-base md:text-lg">{t(article.titleKey)}</h2>
          <p className="text-sm">{t(article.dateKey)}</p>
          <p className="text-sm md:text-base leading-relaxed">{t(article.contentKey)}</p>
        </article>
      ))}
    </div>
  );
};

export default NewsSection;
