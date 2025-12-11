import { Progress } from '@/components/ui/progress';
import { quizLevels, getTotalQuestions } from './quizData';

interface QuizProgressProps {
  currentLevel: number;
  currentQuestion: number;
  totalAnswered: number;
}

export function QuizProgress({ currentLevel, currentQuestion, totalAnswered }: QuizProgressProps) {
  const totalQuestions = getTotalQuestions();
  const progressPercent = (totalAnswered / totalQuestions) * 100;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Уровень {currentLevel} из {quizLevels.length - 1}
        </span>
        <span className="font-mono">
          {totalAnswered}/{totalQuestions}
        </span>
      </div>
      <Progress value={progressPercent} className="h-2" />
      <div className="text-center">
        <h2 className="text-lg font-bold">{quizLevels[currentLevel].title}</h2>
        <p className="text-sm text-muted-foreground">{quizLevels[currentLevel].subtitle}</p>
      </div>
    </div>
  );
}
