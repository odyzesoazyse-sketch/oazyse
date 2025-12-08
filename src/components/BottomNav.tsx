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
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-foreground z-50">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-xs md:text-sm px-2 py-2 ${
              activeTab === tab.id ? 'font-bold' : 'font-normal'
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
