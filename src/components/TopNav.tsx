import { useTranslation } from 'react-i18next';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNav = ({ activeTab, onTabChange }: TopNavProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'oazyse', labelKey: 'nav.oazyse' },
    { id: 'institute', labelKey: 'nav.institute' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'about', labelKey: 'nav.about' },
  ];

  return (
    <nav className="fixed top-7 left-0 right-0 bg-background z-40">
      <div className="flex items-center justify-center h-8 gap-1 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1 text-[9px] uppercase tracking-[0.12em] transition-all relative ${
              activeTab === tab.id 
                ? 'text-neon-purple' 
                : 'text-muted-foreground hover:text-neon-green'
            }`}
          >
            {t(tab.labelKey)}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-neon-purple animate-neon-pulse-purple" />
            )}
          </button>
        ))}
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
    </nav>
  );
};

export default TopNav;