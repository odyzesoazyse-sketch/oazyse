import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import NewsSection from '@/components/sections/NewsSection';
import OazyseSection from '@/components/sections/OazyseSection';
import InstituteSection from '@/components/sections/InstituteSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactsSection from '@/components/sections/ContactsSection';

const Index = () => {
  const tabs = ['news', 'oazyse', 'institute', 'services', 'about', 'contacts'];
  const [activeTab, setActiveTab] = useState('news');
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      const currentIndex = tabs.indexOf(activeTab);
      
      if (diff > 0 && currentIndex < tabs.length - 1) {
        // Свайп влево - следующая вкладка
        setActiveTab(tabs[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        // Свайп вправо - предыдущая вкладка
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    handleSwipe();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let endX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (startX === 0) return;
      endX = e.clientX;
    };

    const handleMouseUp = () => {
      if (startX === 0) return;
      
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        const currentIndex = tabs.indexOf(activeTab);
        
        if (diff > 0 && currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
          setActiveTab(tabs[currentIndex - 1]);
        }
      }

      startX = 0;
      endX = 0;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [activeTab, tabs]);

  const renderSection = () => {
    switch (activeTab) {
      case 'news':
        return <NewsSection />;
      case 'oazyse':
        return <OazyseSection />;
      case 'institute':
        return <InstituteSection />;
      case 'services':
        return <ServicesSection />;
      case 'about':
        return <AboutSection />;
      case 'contacts':
        return <ContactsSection />;
      default:
        return <NewsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main 
        ref={containerRef}
        className="pt-24 pb-24 px-4 touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-2xl mx-auto">
          {renderSection()}
        </div>
      </main>

      <footer className="fixed bottom-16 left-0 right-0 bg-background py-2 px-4 text-center text-xs border-t border-foreground">
        © 2025 Oazyse. Все права защищены.
      </footer>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
