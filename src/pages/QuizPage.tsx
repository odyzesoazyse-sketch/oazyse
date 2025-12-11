import { Quiz } from '@/components/quiz/Quiz';
import { useEffect } from 'react';

export default function QuizPage() {
  useEffect(() => {
    document.title = 'Омега-300 | Oazyse';
  }, []);

  return <Quiz />;
}
