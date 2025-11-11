interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'news', label: 'Новости' },
    { id: 'oazyse', label: 'Oazyse' },
    { id: 'institute', label: 'Институт' },
    { id: 'services', label: 'Услуги' },
    { id: 'about', label: 'Обо мне' },
    { id: 'contacts', label: 'Контакты' },
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
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
