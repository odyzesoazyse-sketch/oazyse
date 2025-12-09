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
      <div className="flex items-center h-12 overflow-x-auto scrollbar-hide border-t border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 px-4 h-full text-[10px] uppercase tracking-[0.15em] transition-opacity ${
              activeTab === tab.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
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