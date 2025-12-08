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
        className="flex items-center gap-1.5 text-xs px-2 py-1 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
      >
        <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>{currentLang.code}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-background border border-border max-h-64 overflow-y-auto w-36 shadow-sm animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                  i18n.language === lang.code 
                    ? 'bg-foreground text-background' 
                    : 'hover:bg-secondary'
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
