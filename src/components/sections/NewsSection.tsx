import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  date: string;
  content: string;
}

const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Начальные статьи
    const initialArticles: Article[] = [
      {
        id: 1,
        title: 'ДОСТИЖЕНИЕ НЕДЕЛИ',
        date: '15 января 2025',
        content: 'Наш проект достиг важной вехи в развитии сознания. Более 100 участников прошли курс по осознанности и медитации, открывая новые грани своего внутреннего мира. Мы продолжаем исследовать глубины человеческого сознания.',
      },
      {
        id: 2,
        title: 'НОВЫЙ КУРС ПО МЕДИТАЦИИ',
        date: '10 января 2025',
        content: 'Представляем обновленную программу медитативных практик, разработанную с учетом последних исследований в области нейронауки и древних техник осознанности. Курс включает практики для начинающих и продвинутых.',
      },
      {
        id: 3,
        title: 'ОТКРЫТИЕ ИНСТИТУТА',
        date: '5 января 2025',
        content: 'Институт Сознания Космического Разума официально открыл свои двери для всех желающих исследовать природу сознания. Мы предлагаем уникальную возможность погрузиться в практику осознанности под руководством опытных наставников.',
      },
    ];

    setArticles(initialArticles);
  }, []);

  return (
    <div className="space-y-12">
      {articles.map((article) => (
        <article key={article.id} className="space-y-2">
          <h2 className="font-bold uppercase text-base md:text-lg">{article.title}</h2>
          <p className="text-sm">{article.date}</p>
          <p className="text-sm md:text-base leading-relaxed">{article.content}</p>
        </article>
      ))}
    </div>
  );
};

export default NewsSection;
