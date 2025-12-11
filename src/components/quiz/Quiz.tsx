import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, Wand2 } from 'lucide-react';
import { quizLevels, getQuestionNumber, getTotalQuestions } from './quizData';
import { QuizQuestionComponent } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizReport } from './QuizReport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Generate random test data
const generateTestAnswers = () => {
  return {
    code_name: "Тест-Субъект-42",
    birth_sex: "Мужской",
    current_gender: "Мужчина",
    orientation: "Гетеросексуал",
    romantic_orientation: "Гетероромантик",
    age: 32,
    height: 178,
    weight: 75,
    body_fat_percent: 18,
    eye_color: "Карие",
    blood_type: "II (A)",
    chronic_diseases: "Нет",
    allergies: "Пыльца",
    surgeries: "Аппендицит в детстве",
    birth_country: "Россия",
    current_country: "Россия",
    city: "Москва",
    city_district: "Центр",
    mother_nationality: "Русская",
    father_nationality: "Русский",
    childhood_language: "Русский",
    second_language: "Английский",
    official_religion: "Православие",
    actual_belief: "Агностик с верой в высший разум и кармические законы",
    believes_reincarnation: true,
    past_lives_count: 3,
    starseed_type: "Плеядеанец",
    earth_mission: "Помочь человечеству пройти квантовый переход",
    believes_god: "Источник/Вселенная",
    daily_meditation_hours: 1,
    believes_simulation: true,
    believes_adrenochrome: false,
    believes_flat_earth: false,
    believes_antarctica: true,
    believes_moon_station: false,
    believes_chips: true,
    believes_5g: false,
    believes_reptilians: true,
    believes_anunnaki: true,
    believes_great_deception: true,
    believes_deep_state: true,
    believes_afterlife: true,
    afterlife_type: "Реинкарнация",
    family_size: 4,
    birth_order: 2,
    father_relationship: 6,
    mother_relationship: 8,
    has_stepparent: false,
    grandparents_relationship: "Близкие отношения с бабушкой по маме, остальных не знал",
    physical_abuse: false,
    emotional_abuse: true,
    sexual_abuse: false,
    family_alcoholism: true,
    family_suicides: false,
    family_cancer: true,
    family_poverty: true,
    family_wealth: false,
    parents_main_fear: "Остаться без денег",
    mother_main_message: "Будь хорошим человеком",
    father_main_message: "Деньги решают всё",
    first_memory: "Мама держит меня на руках у окна, идёт снег",
    scariest_childhood_day: "Когда родители кричали друг на друга ночью",
    favorite_toy: "Плюшевый медведь",
    first_sexual_experience_age: 14,
    first_love_age: 12,
    first_kiss_age: 13,
    first_sex_age: 17,
    first_cheating_age: 0,
    relationship_status: "Женат/замужем",
    marriages_count: 1,
    divorces_count: 0,
    children: "Сын Максим, 5 лет",
    abortions_count: 0,
    miscarriages_count: 0,
    plans_more_children: true,
    ideal_family_10_years: "Двое детей, дом за городом, пассивный доход",
    parent_role_rating: 7,
    main_fear_for_children: "Что мир станет ещё более безумным",
    monthly_income: "500,000 рублей",
    passive_income: 1000,
    max_single_payment: 5000,
    current_savings: 50000,
    debts: 0,
    mortgage: 100000,
    attitude_to_rich: "Восхищение",
    envy_or_admiration: "Восхищаюсь",
    ready_billionaire_any_cost: false,
    political_views: "Либертарианство",
    ready_for_revolution: false,
    favorite_politician: "Нет такого",
    tax_optimization: true,
    black_cash: false,
    has_crypto: true,
    has_stocks: true,
    has_real_estate: false,
    school_name: "Школа №1234",
    university_name: "МГУ",
    specialty: "Экономика",
    honors_diploma: false,
    expelled: false,
    favorite_subject: "Математика",
    hated_subject: "Физкультура",
    iq_score: 125,
    eq_score: 70,
    talents: "Аналитика, писательство, музыка",
    genius_level: "Синтез информации и поиск паттернов",
    current_profession: "Предприниматель",
    loves_current_job: true,
    dream_occupation: "Писать книги и путешествовать",
    sex_satisfaction: 7,
    sex_frequency: "Несколько раз в неделю",
    masturbation_frequency: "Раз в неделю",
    porn_addiction: false,
    favorite_porn_categories: "—",
    main_fantasy: "—",
    taboo: "Насилие",
    bdsm_role: "Не практикую",
    cheating_history: false,
    partners_count: 5,
    is_virgin: false,
    prostitution_bought: false,
    prostitution_sold: false,
    sexual_trauma: false,
    harassment_victim: false,
    rape_victim: false,
    genital_self_rating: 7,
    orgasmic_ability: 8,
    frigidity_impotence: false,
    fantasy_orientation: "Гетеро",
    real_orientation: "Гетеро",
    naked_body_rating: 6,
    body_complexes: "Худоба",
    best_weight: 80,
    worst_weight: 65,
    eating_disorder: false,
    anorexia: false,
    bulimia: false,
    current_sport: "Бег",
    chronic_pain: "Нет",
    psychosomatics: "Головные боли при стрессе",
    diet_type: "Обычное питание",
    intermittent_fasting: true,
    raw_food: false,
    alcohol_liters_weekly: 0.5,
    cigarettes_daily: 0,
    sugar_addiction: true,
    coffee_addiction: true,
    energy_drinks: false,
    sex_work_doping: false,
    official_diagnoses: "Нет",
    antidepressants: false,
    tranquilizers: false,
    psychiatric_treatment: false,
    suicide_attempts: 0,
    self_harm: false,
    psychopathy_self_rating: 3,
    narcissism_self_rating: 5,
    schizoid_self_rating: 4,
    killed_animals: false,
    killed_humans: false,
    theft_history: false,
    violence_history: false,
    prison_history: false,
    darkest_deed: "Врал близким людям",
    biggest_sin: "Гордыня",
    death_fear_rating: 4,
    desired_death_way: "Во сне, в глубокой старости",
    epitaph: "Он пытался понять",
    legacy_wish: "Оставить след в сознании людей",
    daily_practice_hours: 2,
    transformation_investment: 10000,
    ready_ego_death: true,
    ready_give_all_property: false,
    ready_public_confession: true,
    ready_commune_life: false,
    archive_permission: true,
    email: "test@test.com",
    telegram: "@test_user",
    confirmation_word: "ГОТОВ"
  };
};

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

  // Fill with test data
  const fillTestData = () => {
    const testData = generateTestAnswers();
    setAnswers(testData);
    // Jump to last level/question
    setCurrentLevel(quizLevels.length - 1);
    setCurrentQuestionIndex(quizLevels[quizLevels.length - 1].questions.length - 1);
    toast({
      title: "Тестовые данные загружены",
      description: "Нажми 'Завершить' для генерации отчёта"
    });
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
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-2">
          <QuizProgress
            currentLevel={currentLevel}
            currentQuestion={currentQuestionIndex}
            totalAnswered={countAnswered()}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={fillTestData}
            className="text-muted-foreground hover:text-foreground"
          >
            <Wand2 className="w-4 h-4 mr-1" />
            Тест
          </Button>
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
