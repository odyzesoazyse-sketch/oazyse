import { useTranslation } from 'react-i18next';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'help', labelKey: 'nav.help' },
    { id: 'oazyse', labelKey: 'nav.oazyse' },
    { id: 'institute', labelKey: 'nav.institute' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'contacts', labelKey: 'nav.contacts' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50">
      <div className="flex items-stretch h-16 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex-1 min-w-max flex items-center justify-center px-4 md:px-6
              transition-all duration-300 border-r border-border last:border-r-0
              ${activeTab === tab.id 
                ? 'bg-foreground text-background' 
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <span className="yeezy-label whitespace-nowrap">
              {t(tab.labelKey)}
            </span>
            {activeTab === tab.id && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-background" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;