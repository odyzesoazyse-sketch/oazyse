import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { quizLevels, getQuestionNumber, getTotalQuestions } from './quizData';
import { QuizQuestionComponent } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizReport } from './QuizReport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase
        .from('quiz_responses')
        .insert({})
        .select('session_id')
        .single();
      
      if (data) {
        setSessionId(data.session_id);
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
      await supabase
        .from('quiz_responses')
        .update(answers)
        .eq('session_id', sessionId);
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

  const calculateFlags = () => {
    return {
      flag_childhood_trauma: answers.physical_abuse || answers.emotional_abuse || answers.sexual_abuse,
      flag_sexual_trauma: answers.sexual_abuse || answers.rape_victim || answers.sexual_trauma,
      flag_extreme_conspiracy: [
        answers.believes_flat_earth,
        answers.believes_reptilians,
        answers.believes_adrenochrome,
        answers.believes_moon_station
      ].filter(Boolean).length >= 3,
      flag_millionaire_ready: answers.ready_billionaire_any_cost && answers.transformation_investment > 10000,
      flag_severe_porn_addiction: answers.porn_addiction && answers.masturbation_frequency === 'Несколько раз в день',
      flag_suicide_risk: (answers.suicide_attempts || 0) > 0 || answers.self_harm,
      flag_poverty_karma: answers.family_poverty && (answers.current_savings || 0) < 1000,
      flag_violence_karma: answers.family_alcoholism && (answers.physical_abuse || answers.violence_history),
      flag_lgbt_imbalance: answers.fantasy_orientation !== answers.real_orientation,
      flag_narcissist_psychopath: (answers.narcissism_self_rating || 0) >= 7 || (answers.psychopathy_self_rating || 0) >= 7,
      flag_starseed: answers.starseed_type && answers.starseed_type !== 'Нет',
      flag_ego_death_ready: answers.ready_ego_death && answers.ready_give_all_property && answers.ready_public_confession,
      flag_financial_ceiling: (answers.current_savings || 0) < 100000 && !answers.has_real_estate && !answers.has_stocks,
      flag_top77_candidate: answers.ready_ego_death && answers.ready_commune_life && (answers.transformation_investment || 0) >= 50000
    };
  };

  const completeQuiz = async () => {
    if (!sessionId) return;

    // Validate required fields
    if (!answers.email || !answers.telegram || answers.confirmation_word !== 'ГОТОВ') {
      toast({
        title: 'Заполните обязательные поля',
        description: 'Email, Telegram и слово подтверждения обязательны',
        variant: 'destructive'
      });
      return;
    }

    setIsGeneratingReport(true);

    try {
      // Calculate flags
      const flags = calculateFlags();

      // Save final answers with flags
      await supabase
        .from('quiz_responses')
        .update({
          ...answers,
          ...flags,
          completed: true
        })
        .eq('session_id', sessionId);

      // Generate AI report
      const response = await supabase.functions.invoke('quiz-report', {
        body: { answers, flags, sessionId }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setReport(response.data.report);

      // Save report to database
      await supabase
        .from('quiz_responses')
        .update({ ai_report: response.data.report })
        .eq('session_id', sessionId);

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
        codeName={answers.code_name || 'Аноним'}
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
        <QuizProgress
          currentLevel={currentLevel}
          currentQuestion={currentQuestionIndex}
          totalAnswered={countAnswered()}
        />
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
              'Завершить'
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
