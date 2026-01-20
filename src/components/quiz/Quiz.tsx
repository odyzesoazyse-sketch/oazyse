import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { quizLevels, getQuestionNumber, getTotalQuestions } from './quizData';
import { QuizQuestionComponent } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizReport } from './QuizReport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const QUIZ_OPS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quiz-operations`;

export function Quiz() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const currentLevelData = quizLevels[currentLevel];
  const currentQuestion = currentLevelData.questions[currentQuestionIndex];
  const totalQuestions = getTotalQuestions();

  // Count answered questions
  const countAnswered = () => {
    return Object.keys(answers).filter(key => {
      const val = answers[key];
      return val !== null && val !== undefined && val !== '';
    }).length;
  };

  // Initialize session via edge function
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch(QUIZ_OPS_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
          },
          body: JSON.stringify({ action: 'create' })
        });
        
        if (!response.ok) throw new Error('Failed to create session');
        
        const data = await response.json();
        if (data.session_id) {
          setSessionId(data.session_id);
        }
      } catch (error) {
        console.error('Error creating session:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось создать сессию',
          variant: 'destructive'
        });
      }
    };
    initSession();
  }, []);

  const handleAnswerChange = (field: string, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const saveProgress = async () => {
    if (!sessionId) return;
    
    setIsSaving(true);
    try {
      // Only save fields that exist in the database
      const dbFields = ['code_name', 'age', 'current_country', 'current_profession', 'email', 'telegram'];
      const filteredAnswers: Record<string, any> = {};
      dbFields.forEach(field => {
        if (answers[field] !== undefined) {
          filteredAnswers[field] = answers[field];
        }
      });
      
      if (Object.keys(filteredAnswers).length > 0) {
        const response = await fetch(QUIZ_OPS_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
          },
          body: JSON.stringify({ 
            action: 'update', 
            session_id: sessionId,
            data: filteredAnswers 
          })
        });
        
        if (!response.ok) {
          console.error('Failed to save progress');
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
    setIsSaving(false);
  };

  const goToNext = async () => {
    // Save on each navigation
    await saveProgress();

    if (currentQuestionIndex < currentLevelData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentLevel < quizLevels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Quiz completed
      await completeQuiz();
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentLevel > 0) {
      setCurrentLevel(prev => prev - 1);
      setCurrentQuestionIndex(quizLevels[currentLevel - 1].questions.length - 1);
    }
  };

  const completeQuiz = async () => {
    if (!sessionId) return;

    // Validate required field (name)
    if (!answers.code_name) {
      toast({
        title: 'Укажите ваше имя',
        description: 'Имя необходимо для персонализации отчёта',
        variant: 'destructive'
      });
      return;
    }

    setIsGeneratingReport(true);

    try {
      // Save final answers
      await saveProgress();

      // Generate AI report via edge function
      const response = await supabase.functions.invoke('quiz-report', {
        body: { answers, sessionId }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setReport(response.data.report);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing quiz:', error);
      toast({
        title: 'Ошибка генерации отчёта',
        description: 'Попробуйте ещё раз',
        variant: 'destructive'
      });
    }

    setIsGeneratingReport(false);
  };

  if (isCompleted || isGeneratingReport) {
    return (
      <QuizReport
        report={report}
        isLoading={isGeneratingReport}
        codeName={answers.code_name || 'Гость'}
      />
    );
  }

  const questionNumber = getQuestionNumber(currentLevel, currentQuestionIndex);
  const isFirstQuestion = currentLevel === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentLevel === quizLevels.length - 1 && 
    currentQuestionIndex === currentLevelData.questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with progress */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="max-w-2xl mx-auto">
          <QuizProgress
            currentLevel={currentLevel}
            currentQuestion={currentQuestionIndex}
            totalAnswered={countAnswered()}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="py-8">
          <QuizQuestionComponent
            question={currentQuestion}
            value={answers[currentQuestion.field]}
            onChange={handleAnswerChange}
            questionNumber={questionNumber}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={isFirstQuestion || isSaving}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <Button
            onClick={goToNext}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : isLastQuestion ? (
              'Получить анализ'
            ) : (
              <>
                Далее
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
