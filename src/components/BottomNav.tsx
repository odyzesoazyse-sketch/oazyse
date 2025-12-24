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
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-50 border-t border-border/50">
      <div className="flex items-center justify-center h-14 gap-1 overflow-x-auto scrollbar-hide px-4 max-w-7xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-secondary text-secondary-foreground shadow-[0_0_15px_hsl(var(--neon-green)/0.3)]' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;