import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-2">
          <LanguageSwitcher />
        </div>
        <div className="text-center">
          <h1 className="text-lg md:text-2xl leading-tight">
            <span className="font-bold uppercase">{t('header.title')}</span>
            {" "}{t('header.presents')}{" "}
            <span className="font-bold">Oazyse</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
