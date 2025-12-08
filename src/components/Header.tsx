import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 py-6 px-4 border-b border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-3">
          <LanguageSwitcher />
        </div>
        <div className="text-center">
          <h1 className="text-sm md:text-base leading-relaxed tracking-wide">
            <span className="font-semibold uppercase tracking-widest text-xs md:text-sm">{t('header.title')}</span>
            <span className="text-muted-foreground mx-2">{t('header.presents')}</span>
            <span className="font-serif italic text-lg md:text-xl">Oazyse</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
