import { useTranslation } from 'react-i18next';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'news', labelKey: 'nav.news' },
    { id: 'help', labelKey: 'nav.help' },
    { id: 'oazyse', labelKey: 'nav.oazyse' },
    { id: 'institute', labelKey: 'nav.institute' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'contacts', labelKey: 'nav.contacts' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 z-50 safe-area-pb">
      <div className="flex items-center h-16 max-w-4xl mx-auto px-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex-shrink-0 text-[10px] md:text-xs px-3 md:px-4 py-3 
              transition-all duration-300 uppercase tracking-wider
              ${activeTab === tab.id 
                ? 'font-semibold text-foreground' 
                : 'font-normal text-muted-foreground hover:text-foreground'
              }
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {t(tab.labelKey)}
            {activeTab === tab.id && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
