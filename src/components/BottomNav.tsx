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
    <nav className="fixed bottom-0 left-0 right-0 bg-background z-50">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent" />
      <div className="flex items-center h-12 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 px-4 h-full text-[10px] uppercase tracking-[0.15em] transition-all relative ${
              activeTab === tab.id 
                ? 'text-neon-purple' 
                : 'text-muted-foreground hover:text-neon-green'
            }`}
          >
            {t(tab.labelKey)}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-purple shadow-[0_0_8px_hsl(var(--neon-purple))]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;