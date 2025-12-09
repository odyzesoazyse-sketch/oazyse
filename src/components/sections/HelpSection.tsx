import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const cardIds = ['anxiety', 'sleep', 'habits', 'confidence', 'phobias', 'stress', 'relationships', 'focus', 'pain', 'trauma', 'creativity', 'motivation'];

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
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="label">{t('help.subtitle')}</span>
        <h1 className="title">{t('help.title')}</h1>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <span>{t('help.explored')}</span>
          <span>{revealedCards.size}/{cardIds.length}</span>
        </div>
        <div className="h-px bg-border">
          <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {cardIds.map((id) => {
          const isOpen = openCard === id;
          const isRevealed = revealedCards.has(id);

          return (
            <div
              key={id}
              onClick={() => handleCardClick(id)}
              className={`py-4 border-b border-border cursor-pointer transition-colors ${
                isOpen ? 'bg-foreground text-background -mx-6 px-6' : ''
              }`}
            >
              <span className={`label ${isOpen ? 'text-background/60' : ''}`}>
                {isRevealed ? t(`help.cards.${id}.shortDesc`) : '???'}
              </span>
              <h3 className="mt-1 text-sm">
                {isRevealed ? t(`help.cards.${id}.title`) : '???'}
              </h3>
              {isOpen && (
                <p className={`mt-3 text-sm font-light leading-relaxed animate-fade-in ${isOpen ? 'text-background/80' : ''}`}>
                  {t(`help.cards.${id}.fullDesc`)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {revealedCards.size === cardIds.length && (
        <div className="py-8 text-center animate-fade-in">
          <p className="text-sm">{t('help.allExplored')}</p>
          <p className="label mt-2">{t('help.readyToStart')}</p>
        </div>
      )}
    </div>
  );
};

export default HelpSection;