import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import NewsSection from '@/components/sections/NewsSection';
import HelpSection from '@/components/sections/HelpSection';
import OazyseSection from '@/components/sections/OazyseSection';
import InstituteSection from '@/components/sections/InstituteSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactsSection from '@/components/sections/ContactsSection';
import HypnotherapyChat from '@/components/HypnotherapyChat';

const Index = () => {
  const [activeTab, setActiveTab] = useState('news');
  const { t } = useTranslation();

  const renderSection = () => {
    switch (activeTab) {
      case 'news': return <NewsSection />;
      case 'help': return <HelpSection />;
      case 'oazyse': return <OazyseSection />;
      case 'institute': return <InstituteSection />;
      case 'services': return <ServicesSection />;
      case 'about': return <AboutSection />;
      case 'contacts': return <ContactsSection />;
      default: return <NewsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24 px-4">
        <div className="max-w-2xl mx-auto">{renderSection()}</div>
      </main>
      <footer className="fixed bottom-16 left-0 right-0 bg-background py-2 px-4 text-center text-xs border-t border-foreground">
        {t('footer.rights')}
      </footer>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <HypnotherapyChat />
    </div>
  );
};

export default Index;
