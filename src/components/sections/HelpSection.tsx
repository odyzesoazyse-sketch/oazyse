import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Heart, Moon, Zap, Shield, Smile, 
  Target, Flame, Leaf, Eye, Sparkles, Lock,
  X
} from 'lucide-react';

const cardIds = ['anxiety', 'sleep', 'habits', 'confidence', 'phobias', 'stress', 'relationships', 'focus', 'pain', 'trauma', 'creativity', 'motivation'];

const icons: Record<string, React.ReactNode> = {
  anxiety: <Shield className="w-6 h-6" strokeWidth={1} />,
  sleep: <Moon className="w-6 h-6" strokeWidth={1} />,
  habits: <Flame className="w-6 h-6" strokeWidth={1} />,
  confidence: <Sparkles className="w-6 h-6" strokeWidth={1} />,
  phobias: <Eye className="w-6 h-6" strokeWidth={1} />,
  stress: <Zap className="w-6 h-6" strokeWidth={1} />,
  relationships: <Heart className="w-6 h-6" strokeWidth={1} />,
  focus: <Target className="w-6 h-6" strokeWidth={1} />,
  pain: <Leaf className="w-6 h-6" strokeWidth={1} />,
  trauma: <Lock className="w-6 h-6" strokeWidth={1} />,
  creativity: <Brain className="w-6 h-6" strokeWidth={1} />,
  motivation: <Smile className="w-6 h-6" strokeWidth={1} />,
};

const HelpSection = () => {
  const { t } = useTranslation();
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

  const progress = (revealedCards.size / cardIds.length) * 100;

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <span className="yeezy-label text-muted-foreground">{t('help.subtitle')}</span>
        <h1 className="font-display text-huge tracking-tight mt-4">
          {t('help.title')}
        </h1>
      </div>

      {/* Progress */}
      <div className="mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="yeezy-label text-muted-foreground">{t('help.explored')}</span>
          <span className="font-display text-2xl">{revealedCards.size}/{cardIds.length}</span>
        </div>
        <div className="h-1 bg-border overflow-hidden">
          <div 
            className="h-full bg-foreground transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        {cardIds.map((id, index) => {
          const isOpen = openCard === id;
          const isRevealed = revealedCards.has(id);
          
          return (
            <div 
              key={id} 
              onClick={() => handleCardClick(id)} 
              className={`
                relative cursor-pointer transition-all duration-300 animate-slide-up bg-background
                ${isOpen ? 'col-span-2 md:col-span-4 row-span-2' : ''}
              `}
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              <div className={`
                h-full min-h-[140px] md:min-h-[180px] p-6 md:p-8 transition-all duration-300
                ${isOpen ? 'bg-foreground text-background' : 'hover:bg-muted'}
                ${!isRevealed && !isOpen ? 'opacity-60' : ''}
              `}>
                {isOpen ? (
                  <div className="space-y-6 animate-slide-up">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="opacity-60">{icons[id]}</div>
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                            {t(`help.cards.${id}.title`)}
                          </h3>
                          <p className="yeezy-label opacity-60 mt-1">{t(`help.cards.${id}.shortDesc`)}</p>
                        </div>
                      </div>
                      <X className="w-6 h-6 opacity-60" />
                    </div>
                    <p className="yeezy-body opacity-80 max-w-2xl">
                      {t(`help.cards.${id}.fullDesc`)}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                    <div className={`transition-opacity duration-300 ${!isRevealed ? 'opacity-20' : 'opacity-40'}`}>
                      {isRevealed ? icons[id] : <Lock className="w-6 h-6" strokeWidth={1} />}
                    </div>
                    <span className="yeezy-label">
                      {isRevealed ? t(`help.cards.${id}.title`) : '???'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      {revealedCards.size === cardIds.length && (
        <div className="mt-12 p-12 bg-foreground text-background text-center animate-slide-up">
          <h2 className="font-display text-display tracking-tight">{t('help.allExplored')}</h2>
          <p className="yeezy-label opacity-60 mt-4">{t('help.readyToStart')}</p>
        </div>
      )}
    </div>
  );
};

export default HelpSection;