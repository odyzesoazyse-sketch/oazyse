import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      // Check certification status
      const { data: cert } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      if (cert) {
        setCertification(cert);
      }

      // Check if all lessons completed
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

    // Calculate score
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
        toast.success('Поздравляем! Вы успешно прошли сертификацию!');
        setCertification({
          passed: true,
          test_score: scorePercent,
          certified_at: new Date().toISOString()
        });
      } else {
        toast.error('К сожалению, тест не пройден. Попробуйте ещё раз после повторения материала.');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error('Ошибка сохранения результата');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  // Already certified
  if (certification?.passed) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
            <Award className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-3xl font-light text-foreground mb-2">Вы сертифицированы!</h1>
          <p className="text-muted-foreground mb-4">
            Сертификат получен {new Date(certification.certified_at).toLocaleDateString('ru-RU')}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Результат теста: {certification.test_score}%
          </Badge>
        </div>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Теперь вы можете проводить сеансы
            </h3>
            <p className="text-muted-foreground mb-4">
              Перейдите в раздел сеансов, чтобы увидеть заявки от других участников
            </p>
            <Button asChild variant="secondary">
              <Link to="/member/sessions">
                Перейти к сеансам
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
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-light text-foreground mb-2">Тест не пройден</h1>
          <p className="text-muted-foreground mb-4">
            Ваш результат: {score}%. Для сертификации необходимо набрать минимум 80%.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/member/lessons">
                <BookOpen className="w-4 h-4 mr-2" />
                Повторить материал
              </Link>
            </Button>
            <Button onClick={startTest}>
              Пройти тест снова
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Test in progress
  if (testStarted && !testCompleted) {
    const question = testQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
    const allAnswered = Object.keys(answers).length === testQuestions.length;

    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Вопрос {currentQuestion + 1} из {testQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-medium text-foreground">{question.question}</h2>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => selectAnswer(question.id, parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
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
          >
            Назад
          </Button>
          
          {currentQuestion === testQuestions.length - 1 ? (
            <Button onClick={submitTest} disabled={!allAnswered}>
              Завершить тест
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={answers[question.id] === undefined}
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
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Сертификация практика</h1>
        <p className="text-muted-foreground">
          Пройдите тест и получите возможность проводить сеансы метасинхроники
        </p>
      </div>

      {!lessonsCompleted ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Сначала завершите обучение
            </h3>
            <p className="text-muted-foreground mb-4">
              Для прохождения сертификации необходимо изучить все уроки
            </p>
            <Button asChild>
              <Link to="/member/lessons">
                <BookOpen className="w-4 h-4 mr-2" />
                Перейти к урокам
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Вы готовы к сертификации!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Тест состоит из {testQuestions.length} вопросов. Для успешной сертификации 
                    необходимо ответить правильно минимум на 80% вопросов.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    <li>• Время не ограничено</li>
                    <li>• Можно возвращаться к предыдущим вопросам</li>
                    <li>• При неудаче можно пройти тест повторно</li>
                  </ul>
                  <Button onClick={startTest}>
                    Начать тест
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MemberCertification;
