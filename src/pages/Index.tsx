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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentIndex = () => tabs.indexOf(activeTab);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    const currentIndex = getCurrentIndex();
    
    // Ограничиваем drag на границах
    if ((diff > 0 && currentIndex === 0) || (diff < 0 && currentIndex === tabs.length - 1)) {
      setDragOffset(diff * 0.3); // Легкий эффект сопротивления на границах
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 100; // Минимальное расстояние для переключения
    const currentIndex = getCurrentIndex();
    
    if (Math.abs(dragOffset) > threshold) {
      setIsAnimating(true);
      
      if (dragOffset < 0 && currentIndex < tabs.length - 1) {
        // Свайп влево - следующая вкладка
        setActiveTab(tabs[currentIndex + 1]);
      } else if (dragOffset > 0 && currentIndex > 0) {
        // Свайп вправо - предыдущая вкладка
        setActiveTab(tabs[currentIndex - 1]);
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
    
    setDragOffset(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let currentX = 0;
    let mouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      currentX = e.clientX;
      mouseDown = true;
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return;
      
      currentX = e.clientX;
      const diff = currentX - startX;
      const currentIndex = getCurrentIndex();
      
      if ((diff > 0 && currentIndex === 0) || (diff < 0 && currentIndex === tabs.length - 1)) {
        setDragOffset(diff * 0.3);
      } else {
        setDragOffset(diff);
      }
    };

    const handleMouseUp = () => {
      if (!mouseDown) return;
      
      mouseDown = false;
      setIsDragging(false);
      
      const threshold = 100;
      const diff = currentX - startX;
      const currentIndex = getCurrentIndex();
      
      if (Math.abs(diff) > threshold) {
        setIsAnimating(true);
        
        if (diff < 0 && currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
        } else if (diff > 0 && currentIndex > 0) {
          setActiveTab(tabs[currentIndex - 1]);
        }
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }
      
      setDragOffset(0);
      startX = 0;
      currentX = 0;
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

  const getSectionContent = (tab: string) => {
    switch (tab) {
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

  const renderSection = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const getTransform = () => {
      if (isDragging || isAnimating) {
        return `translateX(${dragOffset}px)`;
      }
      return 'translateX(0)';
    };

    const getTransition = () => {
      if (isDragging) return 'none';
      return 'transform 0.3s ease-out';
    };

    return (
      <div className="relative overflow-hidden">
        <div 
          style={{ 
            transform: getTransform(),
            transition: getTransition(),
          }}
          className="flex"
        >
          {/* Предыдущая секция */}
          {prevIndex >= 0 && (
            <div className="min-w-full flex-shrink-0">
              {getSectionContent(tabs[prevIndex])}
            </div>
          )}
          
          {/* Текущая секция */}
          <div className="min-w-full flex-shrink-0" style={{ marginLeft: prevIndex < 0 ? '0' : '-100%' }}>
            {getSectionContent(activeTab)}
          </div>
          
          {/* Следующая секция */}
          {nextIndex < tabs.length && (
            <div className="min-w-full flex-shrink-0" style={{ marginLeft: '-100%' }}>
              {getSectionContent(tabs[nextIndex])}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleTabChange = (tab: string) => {
    // При клике на вкладку - без анимации
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main 
        ref={containerRef}
        className="pt-24 pb-24 px-4 touch-pan-y select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
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

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
