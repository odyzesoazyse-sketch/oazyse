import { useState } from 'react';
import Header from '@/components/Header';
import TopNav from '@/components/TopNav';
import MarqueeBanner from '@/components/MarqueeBanner';
import HomeSection from '@/components/sections/HomeSection';
import OazyseSection from '@/components/sections/OazyseSection';
import InstituteSection from '@/components/sections/InstituteSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactsSection from '@/components/sections/ContactsSection';
import HypnotherapyChat from '@/components/HypnotherapyChat';
import IntroModal from '@/components/IntroModal';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderSection = () => {
    switch (activeTab) {
      case 'home': return <HomeSection />;
      case 'oazyse': return <OazyseSection />;
      case 'institute': return <InstituteSection />;
      case 'services': return <ServicesSection />;
      case 'about': return <AboutSection />;
      case 'contacts': return <ContactsSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <IntroModal />
      <Header />
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <MarqueeBanner />
      <main className="pt-16 pb-4">
        <div key={activeTab} className="animate-fade-in">
          {renderSection()}
        </div>
      </main>
      <HypnotherapyChat />
    </div>
  );
};

export default Index;