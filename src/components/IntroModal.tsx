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
  const [showLangMenu, setShowLangMenu] = useState(false);

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
    setShowLangMenu(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Rejection screen
  if (isRejected) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-fade-in">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-8 bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent"
          style={{ fontFamily: 'Questrial, sans-serif' }}
        >
          oazyse°
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm mb-12 text-center px-6">
          {t('intro.rejectedMessage', 'Вы сохранили право на незнание.')}
        </p>
        <button
          onClick={handleReturn}
          className="px-6 py-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-300"
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
        {/* Main logo - smaller */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight mb-6 bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent"
          style={{ fontFamily: 'Questrial, sans-serif' }}
        >
          oazyse°
        </h1>

        {/* Disclaimer text */}
        <p className="text-muted-foreground text-[10px] sm:text-xs mb-4 text-center max-w-sm">
          {t('intro.disclaimer', 'При посещении портала посетитель теряет право на незнание.')}
        </p>

        {/* Terms link */}
        <button
          onClick={() => setShowTerms(true)}
          className="text-[10px] text-muted-foreground/60 hover:text-neon-purple transition-colors mb-10"
        >
          {t('intro.termsLink', 'Условия сайта')}
        </button>

        {/* Action buttons - gradient style, no borders */}
        <div className="flex gap-6 mb-10">
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-xs bg-gradient-to-r from-neon-green/80 to-neon-green text-background hover:opacity-90 transition-all duration-300 rounded-sm"
          >
            {t('intro.accept', 'Принять')}
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-2 text-xs bg-gradient-to-r from-red-500/80 to-red-600 text-white hover:opacity-90 transition-all duration-300 rounded-sm"
          >
            {t('intro.reject', 'Отклонить')}
          </button>
        </div>

        {/* Language switcher - single icon with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 text-muted-foreground hover:text-neon-purple transition-colors"
          >
            <Globe className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 bg-background border border-border max-h-48 overflow-y-auto w-32 shadow-lg animate-fade-in scrollbar-hide">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 text-[10px] transition-all ${
                      i18n.language === lang.code 
                        ? 'bg-neon-purple/10 text-neon-purple' 
                        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Terms Modal */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-normal">
              {t('intro.termsTitle', 'Условия использования')}
            </DialogTitle>
          </DialogHeader>
          <div className="text-xs text-muted-foreground space-y-4 py-4">
            <p>{t('intro.termsPlaceholder', 'Текст условий будет добавлен позже.')}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntroModal;
