import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '@/i18n';
import { Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const INTRO_ACCEPTED_KEY = 'oazyse_intro_accepted';

const IntroModal = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(INTRO_ACCEPTED_KEY);
    if (!accepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(INTRO_ACCEPTED_KEY, 'true');
    setIsOpen(false);
  };

  const handleReject = () => {
    setIsRejected(true);
  };

  const handleReturn = () => {
    setIsRejected(false);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  // Rejection screen
  if (isRejected) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-fade-in">
        <h1 
          className="text-6xl sm:text-8xl md:text-9xl font-normal tracking-tight mb-8 bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent"
          style={{ fontFamily: 'Questrial, sans-serif' }}
        >
          oazyse°
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-12 text-center px-6">
          {t('intro.rejectedMessage', 'Вы сохранили право на незнание.')}
        </p>
        <button
          onClick={handleReturn}
          className="px-8 py-3 text-sm border border-border hover:border-neon-purple hover:text-neon-purple transition-all duration-300"
        >
          {t('intro.return', 'Вернуться')}
        </button>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6 animate-fade-in">
        {/* Main logo */}
        <h1 
          className="text-7xl sm:text-8xl md:text-[120px] lg:text-[150px] font-normal tracking-tight mb-6 bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent"
          style={{ fontFamily: 'Questrial, sans-serif' }}
        >
          oazyse°
        </h1>

        {/* Disclaimer text */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-6 text-center max-w-md">
          {t('intro.disclaimer', 'При посещении портала посетитель теряет право на незнание.')}
        </p>

        {/* Terms link */}
        <button
          onClick={() => setShowTerms(true)}
          className="text-xs text-muted-foreground hover:text-neon-purple underline underline-offset-4 mb-8 transition-colors"
        >
          {t('intro.termsLink', 'Условия сайта')}
        </button>

        {/* Action buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={handleAccept}
            className="px-8 py-3 text-sm bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green/20 transition-all duration-300"
          >
            {t('intro.accept', 'Принять')}
          </button>
          <button
            onClick={handleReject}
            className="px-8 py-3 text-sm bg-destructive/10 border border-destructive text-destructive hover:bg-destructive/20 transition-all duration-300"
          >
            {t('intro.reject', 'Отклонить')}
          </button>
        </div>

        {/* Language switcher - icons only */}
        <div className="flex items-center gap-1 flex-wrap justify-center max-w-xs">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`p-2 rounded-sm transition-all duration-200 ${
                i18n.language === lang.code
                  ? 'bg-neon-purple/20 text-neon-purple'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
              title={lang.name}
            >
              <Globe className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      {/* Terms Modal */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-normal">
              {t('intro.termsTitle', 'Условия использования')}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4 py-4">
            <p>{t('intro.termsPlaceholder', 'Текст условий будет добавлен позже.')}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntroModal;
