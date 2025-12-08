import { useState } from 'react';
import { 
  Brain, Heart, Moon, Zap, Shield, Smile, 
  Target, Flame, Leaf, Eye, Sparkles, Lock
} from 'lucide-react';

interface HelpCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
}

const helpCards: HelpCard[] = [
  {
    id: 'anxiety',
    icon: <Shield className="w-8 h-8" />,
    title: 'Тревожность',
    shortDesc: 'Страхи и паника',
    fullDesc: 'Гипнотерапия помогает найти корень тревожных состояний в подсознании и перепрограммировать реакции. Вы научитесь входить в состояние спокойствия по желанию.',
    color: 'bg-foreground/5'
  },
  {
    id: 'sleep',
    icon: <Moon className="w-8 h-8" />,
    title: 'Бессонница',
    shortDesc: 'Проблемы со сном',
    fullDesc: 'Техники глубокой релаксации и работа с подсознательными блоками восстанавливают естественный цикл сна. Многие замечают улучшения уже после первого сеанса.',
    color: 'bg-foreground/5'
  },
  {
    id: 'habits',
    icon: <Flame className="w-8 h-8" />,
    title: 'Привычки',
    shortDesc: 'Курение, переедание',
    fullDesc: 'Гипноз работает напрямую с подсознанием, где живут привычки. Мы находим триггеры и заменяем нежелательное поведение на здоровые альтернативы.',
    color: 'bg-foreground/5'
  },
  {
    id: 'confidence',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Уверенность',
    shortDesc: 'Самооценка',
    fullDesc: 'Раскрываем внутренний потенциал, убираем ограничивающие убеждения. Вы начинаете видеть себя в новом свете и действовать из состояния силы.',
    color: 'bg-foreground/5'
  },
  {
    id: 'phobias',
    icon: <Eye className="w-8 h-8" />,
    title: 'Фобии',
    shortDesc: 'Иррациональные страхи',
    fullDesc: 'От страха высоты до боязни пауков — гипнотерапия находит момент возникновения фобии и нейтрализует эмоциональный заряд. Быстро и без травм.',
    color: 'bg-foreground/5'
  },
  {
    id: 'stress',
    icon: <Zap className="w-8 h-8" />,
    title: 'Стресс',
    shortDesc: 'Выгорание',
    fullDesc: 'Обучаем техникам мгновенной релаксации и работаем с глубинными причинами хронического стресса. Вы получаете инструменты для самостоятельной практики.',
    color: 'bg-foreground/5'
  },
  {
    id: 'relationships',
    icon: <Heart className="w-8 h-8" />,
    title: 'Отношения',
    shortDesc: 'Связи с людьми',
    fullDesc: 'Паттерны отношений формируются в детстве. Гипнотерапия помогает осознать и изменить подсознательные сценарии, мешающие близости.',
    color: 'bg-foreground/5'
  },
  {
    id: 'focus',
    icon: <Target className="w-8 h-8" />,
    title: 'Концентрация',
    shortDesc: 'Фокус и память',
    fullDesc: 'Состояние гипноза само по себе тренирует концентрацию. Дополнительно мы убираем внутренние отвлекающие факторы и усиливаем ментальную ясность.',
    color: 'bg-foreground/5'
  },
  {
    id: 'pain',
    icon: <Leaf className="w-8 h-8" />,
    title: 'Боль',
    shortDesc: 'Управление болью',
    fullDesc: 'Гипноз используется в медицине для обезболивания. Мы учим мозг менять восприятие боли — это работает при хронических болях и даже в родах.',
    color: 'bg-foreground/5'
  },
  {
    id: 'trauma',
    icon: <Lock className="w-8 h-8" />,
    title: 'Травмы',
    shortDesc: 'Прошлые события',
    fullDesc: 'Безопасная работа с травматическим опытом в гипнозе позволяет переработать события без ретравматизации. Освобождение приходит мягко.',
    color: 'bg-foreground/5'
  },
  {
    id: 'creativity',
    icon: <Brain className="w-8 h-8" />,
    title: 'Творчество',
    shortDesc: 'Креативность',
    fullDesc: 'Гипноз открывает доступ к правому полушарию и глубинным ресурсам психики. Многие художники и музыканты используют самогипноз для вдохновения.',
    color: 'bg-foreground/5'
  },
  {
    id: 'motivation',
    icon: <Smile className="w-8 h-8" />,
    title: 'Мотивация',
    shortDesc: 'Достижение целей',
    fullDesc: 'Подсознание — мощный союзник. Мы программируем его на поддержку ваших целей, убирая внутреннее сопротивление и прокрастинацию.',
    color: 'bg-foreground/5'
  },
];

const HelpSection = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  const handleCardClick = (id: string) => {
    if (openCard === id) {
      setOpenCard(null);
    } else {
      setOpenCard(id);
      setRevealedCards(prev => new Set(prev).add(id));
    }
  };

  const progress = (revealedCards.size / helpCards.length) * 100;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Чем поможет гипнотерапия?</h1>
        <p className="text-sm text-muted-foreground">
          Нажимайте на карточки, чтобы раскрыть секреты
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Исследовано</span>
          <span>{revealedCards.size} / {helpCards.length}</span>
        </div>
        <div className="h-2 bg-foreground/10 overflow-hidden">
          <div 
            className="h-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-3">
        {helpCards.map((card) => {
          const isOpen = openCard === card.id;
          const isRevealed = revealedCards.has(card.id);
          
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                relative cursor-pointer transition-all duration-300
                ${isOpen ? 'col-span-3 row-span-2' : ''}
              `}
            >
              <div
                className={`
                  border border-foreground p-4 h-full
                  transition-all duration-300 ease-out
                  ${isOpen ? 'bg-foreground text-background' : card.color}
                  ${!isRevealed ? 'hover:bg-foreground/10' : ''}
                  ${isRevealed && !isOpen ? 'opacity-60' : ''}
                `}
              >
                {isOpen ? (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center gap-3">
                      {card.icon}
                      <div>
                        <h3 className="font-bold">{card.title}</h3>
                        <p className="text-xs opacity-70">{card.shortDesc}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{card.fullDesc}</p>
                    <p className="text-xs opacity-50 text-center">нажмите чтобы закрыть</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 min-h-[80px]">
                    <div className={`transition-transform duration-300 ${isRevealed ? '' : 'hover:scale-110'}`}>
                      {isRevealed ? card.icon : <Lock className="w-6 h-6 opacity-40" />}
                    </div>
                    <span className="text-xs font-medium">
                      {isRevealed ? card.title : '???'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {revealedCards.size === helpCards.length && (
        <div className="text-center py-4 border border-foreground bg-foreground text-background animate-fade-in">
          <p className="font-bold">🎉 Вы исследовали все возможности!</p>
          <p className="text-sm opacity-70">Готовы начать свой путь к изменениям?</p>
        </div>
      )}
    </section>
  );
};

export default HelpSection;
