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
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 z-50">
      <div className="flex justify-around items-center h-14 max-w-4xl mx-auto px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-[10px] md:text-xs px-1.5 py-2 transition-all duration-200 uppercase tracking-wider ${
              activeTab === tab.id 
                ? 'font-semibold text-foreground' 
                : 'font-normal text-muted-foreground hover:text-foreground'
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
