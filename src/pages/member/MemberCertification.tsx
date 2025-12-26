import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Award, CheckCircle2, XCircle, BookOpen, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface CertificationStatus {
  passed: boolean;
  test_score: number;
  certified_at: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const testQuestions: Question[] = [
  {
    id: 1,
    question: 'Что является основной целью метасинхроники?',
    options: [
      'Лечение физических заболеваний',
      'Трансформация и гармонизация сознания',
      'Улучшение памяти',
      'Развитие экстрасенсорных способностей'
    ],
    correct: 1
  },
  {
    id: 2,
    question: 'Какой принцип лежит в основе метасинхроники?',
    options: [
      'Подавление негативных эмоций',
      'Осознанная работа с подсознательными паттернами',
      'Медикаментозная терапия',
      'Гипноз без согласия клиента'
    ],
    correct: 1
  },
  {
    id: 3,
    question: 'Что необходимо для проведения безопасного сеанса?',
    options: [
      'Специальное оборудование',
      'Медицинское образование',
      'Добровольное согласие и доверие участника',
      'Присутствие нескольких наблюдателей'
    ],
    correct: 2
  },
  {
    id: 4,
    question: 'Как долго обычно длится один сеанс метасинхроники?',
    options: [
      '5-10 минут',
      '30-60 минут',
      '3-4 часа',
      '24 часа'
    ],
    correct: 1
  },
  {
    id: 5,
    question: 'Какой этический принцип наиболее важен в практике?',
    options: [
      'Получение максимальной прибыли',
      'Конфиденциальность и уважение к клиенту',
      'Публикация результатов в социальных сетях',
      'Навязывание своей точки зрения'
    ],
    correct: 1
  },
  {
    id: 6,
    question: 'Что делать, если клиент испытывает сильные эмоции во время сеанса?',
    options: [
      'Немедленно прекратить сеанс',
      'Мягко сопровождать процесс, обеспечивая безопасность',
      'Усилить давление для быстрого результата',
      'Оставить клиента одного'
    ],
    correct: 1
  },
  {
    id: 7,
    question: 'Может ли метасинхроника навредить человеку?',
    options: [
      'Да, всегда',
      'Нет, метод полностью безопасен при правильном применении',
      'Только детям',
      'Только при наличии заболеваний'
    ],
    correct: 1
  },
  {
    id: 8,
    question: 'Кто может практиковать метасинхронику?',
    options: [
      'Только врачи',
      'Только психологи',
      'Любой обученный и сертифицированный человек',
      'Только экстрасенсы'
    ],
    correct: 2
  },
  {
    id: 9,
    question: 'Какова роль практика во время сеанса?',
    options: [
      'Активно навязывать решения',
      'Быть проводником и поддержкой для клиента',
      'Диагностировать заболевания',
      'Критиковать действия клиента'
    ],
    correct: 1
  },
  {
    id: 10,
    question: 'Что происходит после сертификации?',
    options: [
      'Ничего не меняется',
      'Можно проводить сеансы другим участникам платформы',
      'Автоматическое получение денег',
      'Обязательная работа без выходных'
    ],
    correct: 1
  }
];

const MemberCertification = () => {
  const { user } = useAuth();
  const [certification, setCertification] = useState<CertificationStatus | null>(null);
  const [lessonsCompleted, setLessonsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const { data: cert } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      if (cert) {
        setCertification(cert);
      }

      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('is_published', true);

      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('completed', true);

      setLessonsCompleted(
        lessons?.length === progress?.length && (lessons?.length || 0) > 0
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTestCompleted(false);
  };

  const selectAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitTest = async () => {
    if (!user) return;

    let correctAnswers = 0;
    testQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctAnswers++;
      }
    });

    const scorePercent = Math.round((correctAnswers / testQuestions.length) * 100);
    setScore(scorePercent);
    setTestCompleted(true);

    const passed = scorePercent >= 80;

    try {
      const { error } = await supabase
        .from('certifications')
        .insert({
          user_id: user.id,
          test_score: scorePercent,
          passed,
          certified_at: passed ? new Date().toISOString() : null
        });

      if (error) throw error;

      if (passed) {
        toast.success('Поздравляем! Сертификация пройдена!');
        setCertification({
          passed: true,
          test_score: scorePercent,
          certified_at: new Date().toISOString()
        });
      } else {
        toast.error('Тест не пройден. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error('Ошибка сохранения');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground font-light">Загрузка...</div>
      </div>
    );
  }

  // Already certified
  if (certification?.passed) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-sm bg-neon-green/10 flex items-center justify-center animate-neon-pulse-green">
            <Award className="w-10 h-10 text-neon-green" />
          </div>
          <p className="label text-neon-green mb-2">Сертификация</p>
          <h1 className="title mb-4">Вы сертифицированы</h1>
          <p className="body mb-6">
            Получено {new Date(certification.certified_at).toLocaleDateString('ru-RU')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 rounded-sm text-neon-green">
            <span className="text-2xl font-light">{certification.test_score}%</span>
          </div>
        </div>

        <Card className="bg-card border-neon-green/30">
          <CardContent className="p-6 text-center">
            <h3 className="font-light text-foreground mb-2">
              Теперь вы можете проводить сеансы
            </h3>
            <p className="body text-sm mb-4">
              Перейдите в раздел сеансов
            </p>
            <Button asChild className="bg-neon-green hover:bg-neon-green/80 text-secondary-foreground">
              <Link to="/member/sessions">
                К сеансам
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Test completed but not passed
  if (testCompleted && score < 80) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-sm bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>
          <p className="label text-destructive mb-2">Результат</p>
          <h1 className="title mb-4">Тест не пройден</h1>
          <p className="body mb-6">
            Результат: {score}%. Необходимо минимум 80%.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline" className="border-border">
              <Link to="/member/lessons">
                <BookOpen className="w-4 h-4 mr-2" />
                Повторить
              </Link>
            </Button>
            <Button onClick={startTest} className="bg-neon-purple hover:bg-neon-purple/80">
              Ещё раз
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Test in progress
  if (testStarted && !testCompleted) {
    const question = testQuestions[currentQuestion];
    const progressValue = ((currentQuestion + 1) / testQuestions.length) * 100;
    const allAnswered = Object.keys(answers).length === testQuestions.length;

    return (
      <div className="space-y-8 max-w-2xl mx-auto animate-fade-in">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="label">Вопрос {currentQuestion + 1} из {testQuestions.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} className="h-1 bg-muted" />
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-lg font-light text-foreground">{question.question}</h2>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => selectAnswer(question.id, parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-4 rounded-sm border border-border hover:border-neon-purple/50 transition-colors cursor-pointer"
                  onClick={() => selectAnswer(question.id, index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm font-light">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-border"
          >
            Назад
          </Button>
          
          {currentQuestion === testQuestions.length - 1 ? (
            <Button 
              onClick={submitTest} 
              disabled={!allAnswered}
              className="bg-neon-green hover:bg-neon-green/80 text-secondary-foreground"
            >
              Завершить
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={answers[question.id] === undefined}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              Далее
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Not started yet
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <p className="label text-neon-purple">Тестирование</p>
        <h1 className="title">Сертификация</h1>
        <p className="body max-w-xl">
          Пройдите тест и получите возможность проводить сеансы
        </p>
      </div>

      {!lessonsCompleted ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-light text-foreground mb-2">
              Сначала завершите обучение
            </h3>
            <p className="body text-sm mb-4">
              Для сертификации необходимо изучить все уроки
            </p>
            <Button asChild variant="outline" className="border-neon-purple/30 text-neon-purple">
              <Link to="/member/lessons">
                <BookOpen className="w-4 h-4 mr-2" />
                К урокам
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-neon-purple/30 hover:border-neon-purple/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <h3 className="font-light text-foreground mb-2">
                  Вы готовы к сертификации
                </h3>
                <p className="body text-sm mb-4">
                  Тест: {testQuestions.length} вопросов. Минимум 80% для прохождения.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  <li>• Время не ограничено</li>
                  <li>• Можно вернуться к предыдущим вопросам</li>
                  <li>• Повторные попытки разрешены</li>
                </ul>
                <Button onClick={startTest} className="bg-neon-purple hover:bg-neon-purple/80">
                  Начать тест
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberCertification;