import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  content: string;
  gradient: string;
  isNew?: boolean;
}

// Demo stories data - in production this would come from the database
const demoStories: Story[] = [
  {
    id: '1',
    title: 'Метасинхроника',
    content: 'Откройте силу синхронизации сознания с космическими ритмами',
    gradient: 'from-neon-purple via-neon-green to-neon-purple',
    isNew: true,
  },
  {
    id: '2',
    title: 'Трансформация',
    content: 'Каждый день — новая возможность для пробуждения',
    gradient: 'from-neon-green via-neon-purple to-neon-green',
    isNew: true,
  },
  {
    id: '3',
    title: 'Осознанность',
    content: 'Практикуйте присутствие в каждом моменте',
    gradient: 'from-neon-purple to-neon-green',
    isNew: false,
  },
  {
    id: '4',
    title: 'Энергия',
    content: 'Раскройте свой внутренний потенциал через метасинк',
    gradient: 'from-neon-green to-neon-purple',
    isNew: false,
  },
];

interface StoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Stories = ({ isOpen, onClose }: StoriesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const storyDuration = 5000; // 5 seconds per story

  const goToNext = useCallback(() => {
    if (currentIndex < demoStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, onClose]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Auto-advance timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, goToNext]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  if (!isOpen) return null;

  const currentStory = demoStories[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {demoStories.map((_, idx) => (
          <div
            key={idx}
            className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className={cn(
                "h-full bg-gradient-to-r from-neon-purple to-neon-green transition-all duration-100",
                idx < currentIndex ? "w-full" : idx === currentIndex ? "" : "w-0"
              )}
              style={{
                width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-green p-[1px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="text-[8px] text-white font-medium">o°</span>
            </div>
          </div>
          <span className="text-white text-sm font-medium">oazyse°</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Story content */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "bg-gradient-to-br",
          currentStory.gradient
        )}
      >
        <div className="text-center px-8 max-w-md">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {currentStory.title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
            {currentStory.content}
          </p>
        </div>
      </div>

      {/* Navigation areas */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-8 h-8 text-white/60" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-8 h-8 text-white/60" />
      </button>

      {/* Story indicators at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {demoStories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === currentIndex
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};

interface StoriesTriggerProps {
  onClick: () => void;
  hasNew: boolean;
}

export const StoriesTrigger = ({ onClick, hasNew }: StoriesTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center group p-1"
    >
      {/* Animated ring for new stories with logo inside */}
      <div
        className={cn(
          "w-4 h-4 rounded-full p-[1.5px] transition-all duration-300",
          hasNew
            ? "bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple animate-[spin_8s_linear_infinite] bg-[length:200%_100%]"
            : "bg-foreground/30"
        )}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src="/favicon.png" 
            alt="oazyse" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </button>
  );
};

export const hasNewStories = () => {
  return demoStories.some(story => story.isNew);
};
