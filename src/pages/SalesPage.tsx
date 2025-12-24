import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Heart, 
  Users, 
  Trophy, 
  Building2, 
  Brain, 
  Zap, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Star,
  Gem,
  ChevronUp,
  ChevronDown,
  X,
  Target,
  Lightbulb,
  Share2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  icon: React.ElementType;
  gradient: string;
  bgPattern?: string;
}

const stories: Story[] = [
  { id: 'hero', icon: Gem, gradient: 'from-primary via-accent to-primary' },
  { id: 'metasync', icon: Brain, gradient: 'from-primary to-purple-600' },
  { id: 'metahuman', icon: Zap, gradient: 'from-accent to-emerald-500' },
  { id: 'family', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
  { id: 'athletes', icon: Trophy, gradient: 'from-amber-500 to-orange-500' },
  { id: 'company', icon: Building2, gradient: 'from-blue-500 to-indigo-500' },
  { id: 'computer', icon: Target, gradient: 'from-cyan-500 to-teal-500' },
  { id: 'discovery', icon: Lightbulb, gradient: 'from-yellow-500 to-amber-500' },
  { id: 'safety', icon: Shield, gradient: 'from-emerald-500 to-green-500' },
  { id: 'guarantee', icon: Star, gradient: 'from-primary to-accent' },
  { id: 'cta', icon: Sparkles, gradient: 'from-primary via-accent to-primary' },
];

const SalesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoProgressRef = useRef<NodeJS.Timeout | null>(null);

  const STORY_DURATION = 8000; // 8 seconds per story
  const ANIMATION_DURATION = 400;

  const goToNext = useCallback(() => {
    if (isAnimating || currentIndex >= stories.length - 1) return;
    setIsAnimating(true);
    setDirection('up');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsAnimating(false);
      setDirection(null);
    }, ANIMATION_DURATION);
  }, [currentIndex, isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setDirection('down');
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setIsAnimating(false);
      setDirection(null);
    }, ANIMATION_DURATION);
  }, [currentIndex, isAnimating]);

  const goToStory = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'up' : 'down');
    setTimeout(() => {
      setCurrentIndex(index);
      setProgress(0);
      setIsAnimating(false);
      setDirection(null);
    }, ANIMATION_DURATION);
  }, [currentIndex, isAnimating]);

  // Auto-progress
  useEffect(() => {
    autoProgressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            goToNext();
          }
          return 0;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    return () => {
      if (autoProgressRef.current) clearInterval(autoProgressRef.current);
    };
  }, [currentIndex, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, navigate]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    setTouchStart(null);
  };

  // Wheel handler
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 30) goToNext();
    else if (e.deltaY < -30) goToPrev();
  }, [goToNext, goToPrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  // Click to navigate
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;
    
    if (y < threshold) goToPrev();
    else goToNext();
  };

  const currentStory = stories[currentIndex];

  const renderStoryContent = () => {
    const baseClasses = cn(
      "absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-center transition-all duration-500",
      direction === 'up' && "animate-slide-up",
      direction === 'down' && "animate-slide-down"
    );

    switch (currentStory.id) {
      case 'hero':
        return (
          <div className={baseClasses}>
            <div className="mb-6 animate-bounce-slow">
              <Gem className="w-16 h-16 md:w-24 md:h-24 text-primary drop-shadow-[0_0_30px_hsl(var(--primary))]" />
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t('sales.badge')}</span>
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.hero.title')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              {t('sales.hero.subtitle')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <ChevronDown className="w-5 h-5" />
              <span>Листай вниз</span>
            </div>
          </div>
        );

      case 'metasync':
        return (
          <div className={baseClasses}>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" />
              <Brain className="relative w-20 h-20 md:w-28 md:h-28 text-primary drop-shadow-[0_0_40px_hsl(var(--primary))]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.metasync.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
              {t('sales.metasync.description')}
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/30">
                <Brain className="w-8 h-8 text-primary mb-2 mx-auto" />
                <p className="text-sm font-medium">{t('sales.metasync.metasync.title')}</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-accent/30">
                <Zap className="w-8 h-8 text-accent mb-2 mx-auto" />
                <p className="text-sm font-medium">{t('sales.metasync.metasyncer.title')}</p>
              </div>
            </div>
          </div>
        );

      case 'metahuman':
        return (
          <div className={baseClasses}>
            <Zap className="w-20 h-20 md:w-28 md:h-28 text-accent mb-8 drop-shadow-[0_0_40px_hsl(var(--accent))]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.metahuman.title')}
              </span>
            </h2>
            <ul className="space-y-3 text-left max-w-md">
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-start gap-3 bg-card/30 backdrop-blur-sm rounded-xl p-3 border border-accent/20">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{t(`sales.metahuman.point${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'family':
        return (
          <div className={baseClasses}>
            <Heart className="w-20 h-20 md:w-28 md:h-28 text-pink-500 mb-8 drop-shadow-[0_0_40px_theme(colors.pink.500)] animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.examples.family.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t('sales.examples.family.description')}
            </p>
            <div className="mt-8 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );

      case 'athletes':
        return (
          <div className={baseClasses}>
            <Trophy className="w-20 h-20 md:w-28 md:h-28 text-amber-500 mb-8 drop-shadow-[0_0_40px_theme(colors.amber.500)]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.examples.athletes.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
              {t('sales.examples.athletes.description')}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>
        );

      case 'company':
        return (
          <div className={baseClasses}>
            <Building2 className="w-20 h-20 md:w-28 md:h-28 text-blue-500 mb-8 drop-shadow-[0_0_40px_theme(colors.blue.500)]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.examples.company.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t('sales.examples.company.description')}
            </p>
          </div>
        );

      case 'computer':
        return (
          <div className={baseClasses}>
            <Target className="w-20 h-20 md:w-28 md:h-28 text-cyan-500 mb-8 drop-shadow-[0_0_40px_theme(colors.cyan.500)]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.computer.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t('sales.computer.description')}
            </p>
          </div>
        );

      case 'discovery':
        return (
          <div className={baseClasses}>
            <Lightbulb className="w-20 h-20 md:w-28 md:h-28 text-yellow-500 mb-8 drop-shadow-[0_0_40px_theme(colors.yellow.500)] animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.discovery.title')}
              </span>
            </h2>
            <blockquote className="text-lg md:text-xl italic text-foreground/80 max-w-xl border-l-4 border-yellow-500 pl-4">
              {t('sales.discovery.quote')}
            </blockquote>
          </div>
        );

      case 'safety':
        return (
          <div className={baseClasses}>
            <Shield className="w-20 h-20 md:w-28 md:h-28 text-emerald-500 mb-8 drop-shadow-[0_0_40px_theme(colors.emerald.500)]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.safety.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
              {t('sales.safety.description')}
            </p>
            <div className="flex items-center gap-2 text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-medium">100% безопасно</span>
            </div>
          </div>
        );

      case 'guarantee':
        return (
          <div className={baseClasses}>
            <Star className="w-20 h-20 md:w-28 md:h-28 text-primary mb-8 drop-shadow-[0_0_40px_hsl(var(--primary))]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent`}>
                {t('sales.guarantee.title')}
              </span>
            </h2>
            <div className="space-y-3 max-w-md">
              {[
                t('sales.guarantees.item1'),
                t('sales.guarantees.item2'),
                t('sales.guarantees.item3'),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-primary/20">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className={baseClasses}>
            <Sparkles className="w-20 h-20 md:w-28 md:h-28 text-primary mb-8 drop-shadow-[0_0_40px_hsl(var(--primary))] animate-bounce-slow" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${currentStory.gradient} bg-clip-text text-transparent animate-gradient-x`}>
                {t('sales.finalCta.title')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
              {t('sales.finalCta.description')}
            </p>
            <Link to="/quiz" onClick={(e) => e.stopPropagation()}>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)] transition-all"
              >
                {t('sales.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-background overflow-hidden touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Animated background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700",
        `bg-gradient-to-br ${currentStory.gradient} opacity-10`
      )} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-50 flex gap-1">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/80 rounded-full transition-all duration-100"
              style={{ 
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            `bg-gradient-to-r ${currentStory.gradient}`
          )}>
            <currentStory.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Metahuman</p>
            <p className="text-xs text-muted-foreground">{currentIndex + 1} из {stories.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); /* share */ }} 
            className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/20 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <Link to="/" onClick={(e) => e.stopPropagation()}>
            <button className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Story content */}
      <div className="relative w-full h-full">
        {renderStoryContent()}
      </div>

      {/* Side navigation dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={(e) => { e.stopPropagation(); goToStory(index); }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-foreground scale-150" 
                : "bg-foreground/30 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>

      {/* Navigation hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1">
        {currentIndex > 0 && (
          <ChevronUp className="w-6 h-6 text-muted-foreground animate-bounce" />
        )}
        <span className="text-xs text-muted-foreground">
          {currentIndex < stories.length - 1 ? 'Свайп или клик' : 'Начать'}
        </span>
        {currentIndex < stories.length - 1 && (
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        )}
      </div>
    </div>
  );
};

export default SalesPage;
