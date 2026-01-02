import { Quiz } from '@/components/quiz/Quiz';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function QuizPage() {
  useEffect(() => {
    document.title = 'Экспресс-анализ | Oazyse';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <Quiz />
      </div>
    </div>
  );
}
