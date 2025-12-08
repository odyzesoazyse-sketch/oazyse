import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Heart, Moon, Zap, Shield, Smile, 
  Target, Flame, Leaf, Eye, Sparkles, Lock
} from 'lucide-react';

const cardIds = ['anxiety', 'sleep', 'habits', 'confidence', 'phobias', 'stress', 'relationships', 'focus', 'pain', 'trauma', 'creativity', 'motivation'];

const icons: Record<string, React.ReactNode> = {
  anxiety: <Shield className="w-8 h-8" />,
  sleep: <Moon className="w-8 h-8" />,
  habits: <Flame className="w-8 h-8" />,
  confidence: <Sparkles className="w-8 h-8" />,
  phobias: <Eye className="w-8 h-8" />,
  stress: <Zap className="w-8 h-8" />,
  relationships: <Heart className="w-8 h-8" />,
  focus: <Target className="w-8 h-8" />,
  pain: <Leaf className="w-8 h-8" />,
  trauma: <Lock className="w-8 h-8" />,
  creativity: <Brain className="w-8 h-8" />,
  motivation: <Smile className="w-8 h-8" />,
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
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t('help.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('help.subtitle')}</p>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t('help.explored')}</span>
          <span>{revealedCards.size} / {cardIds.length}</span>
        </div>
        <div className="h-2 bg-foreground/10 overflow-hidden">
          <div className="h-full bg-foreground transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cardIds.map((id) => {
          const isOpen = openCard === id;
          const isRevealed = revealedCards.has(id);
          
          return (
            <div key={id} onClick={() => handleCardClick(id)} className={`relative cursor-pointer transition-all duration-300 ${isOpen ? 'col-span-3 row-span-2' : ''}`}>
              <div className={`border border-foreground p-4 h-full transition-all duration-300 ease-out ${isOpen ? 'bg-foreground text-background' : 'bg-foreground/5'} ${!isRevealed ? 'hover:bg-foreground/10' : ''} ${isRevealed && !isOpen ? 'opacity-60' : ''}`}>
                {isOpen ? (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-center gap-3">
                      {icons[id]}
                      <div>
                        <h3 className="font-bold">{t(`help.cards.${id}.title`)}</h3>
                        <p className="text-xs opacity-70">{t(`help.cards.${id}.shortDesc`)}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{t(`help.cards.${id}.fullDesc`)}</p>
                    <p className="text-xs opacity-50 text-center">{t('help.clickToClose')}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 min-h-[80px]">
                    <div className={`transition-transform duration-300 ${isRevealed ? '' : 'hover:scale-110'}`}>
                      {isRevealed ? icons[id] : <Lock className="w-6 h-6 opacity-40" />}
                    </div>
                    <span className="text-xs font-medium">{isRevealed ? t(`help.cards.${id}.title`) : '???'}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {revealedCards.size === cardIds.length && (
        <div className="text-center py-4 border border-foreground bg-foreground text-background animate-fade-in">
          <p className="font-bold">{t('help.allExplored')}</p>
          <p className="text-sm opacity-70">{t('help.readyToStart')}</p>
        </div>
      )}
    </section>
  );
};

export default HelpSection;
