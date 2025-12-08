import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Heart, Moon, Zap, Shield, Smile, 
  Target, Flame, Leaf, Eye, Sparkles, Lock
} from 'lucide-react';

const cardIds = ['anxiety', 'sleep', 'habits', 'confidence', 'phobias', 'stress', 'relationships', 'focus', 'pain', 'trauma', 'creativity', 'motivation'];

const icons: Record<string, React.ReactNode> = {
  anxiety: <Shield className="w-6 h-6" strokeWidth={1.5} />,
  sleep: <Moon className="w-6 h-6" strokeWidth={1.5} />,
  habits: <Flame className="w-6 h-6" strokeWidth={1.5} />,
  confidence: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
  phobias: <Eye className="w-6 h-6" strokeWidth={1.5} />,
  stress: <Zap className="w-6 h-6" strokeWidth={1.5} />,
  relationships: <Heart className="w-6 h-6" strokeWidth={1.5} />,
  focus: <Target className="w-6 h-6" strokeWidth={1.5} />,
  pain: <Leaf className="w-6 h-6" strokeWidth={1.5} />,
  trauma: <Lock className="w-6 h-6" strokeWidth={1.5} />,
  creativity: <Brain className="w-6 h-6" strokeWidth={1.5} />,
  motivation: <Smile className="w-6 h-6" strokeWidth={1.5} />,
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
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl font-serif italic">{t('help.title')}</h1>
        <p className="text-xs text-muted-foreground tracking-wide">{t('help.subtitle')}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
          <span>{t('help.explored')}</span>
          <span>{revealedCards.size} / {cardIds.length}</span>
        </div>
        <div className="h-px bg-border overflow-hidden">
          <div className="h-full bg-foreground transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {cardIds.map((id, index) => {
          const isOpen = openCard === id;
          const isRevealed = revealedCards.has(id);
          
          return (
            <div 
              key={id} 
              onClick={() => handleCardClick(id)} 
              className={`relative cursor-pointer transition-all duration-300 ${isOpen ? 'col-span-3' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`
                border border-border p-4 h-full transition-all duration-300 ease-out hover-lift
                ${isOpen ? 'bg-foreground text-background border-foreground' : 'bg-background'}
                ${!isRevealed && !isOpen ? 'hover:border-foreground/50' : ''}
                ${isRevealed && !isOpen ? 'opacity-50 hover:opacity-70' : ''}
              `}>
                {isOpen ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5">{icons[id]}</div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm tracking-wide">{t(`help.cards.${id}.title`)}</h3>
                        <p className="text-xs opacity-60">{t(`help.cards.${id}.shortDesc`)}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed font-serif">{t(`help.cards.${id}.fullDesc`)}</p>
                    <p className="text-[10px] opacity-40 text-center uppercase tracking-widest">{t('help.clickToClose')}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 min-h-[72px]">
                    <div className={`transition-all duration-300 ${!isRevealed ? 'opacity-30' : ''}`}>
                      {isRevealed ? icons[id] : <Lock className="w-5 h-5" strokeWidth={1.5} />}
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">
                      {isRevealed ? t(`help.cards.${id}.title`) : '???'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {revealedCards.size === cardIds.length && (
        <div className="text-center py-6 border border-foreground bg-foreground text-background animate-scale-in">
          <p className="font-serif italic text-lg">{t('help.allExplored')}</p>
          <p className="text-xs opacity-60 mt-1 tracking-wide">{t('help.readyToStart')}</p>
        </div>
      )}
    </section>
  );
};

export default HelpSection;
