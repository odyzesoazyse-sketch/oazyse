import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '@/i18n';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-sm transition-all"
      >
        <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-background border border-neon-purple/30 overflow-hidden w-24 shadow-lg animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setIsOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] transition-all ${
                  i18n.language === lang.code 
                    ? 'bg-neon-purple/20 text-neon-purple' 
                    : 'text-muted-foreground hover:bg-neon-purple/10 hover:text-foreground'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
