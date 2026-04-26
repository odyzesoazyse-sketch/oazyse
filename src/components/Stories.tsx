import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  content: string;
  kicker: string;
  isNew?: boolean;
}

const demoStories: Story[] = [
  {
    id: '1',
    kicker: 'главное',
    title: 'oazyse выходит наружу',
    content: 'мы собираем не витрину, а вход в живую систему: главная, хроника, книга и личные сессии.',
    isNew: true,
  },
  {
    id: '2',
    kicker: 'сессии',
    title: 'один запрос — одна работа',
    content: 'если внутри есть повторяющийся сценарий, его можно вынести в персональную метасинхронику с Adizele.',
    isNew: true,
  },
  {
    id: '3',
    kicker: 'книга',
    title: 'искусство вознесения',
    content: 'первый материальный объект оазиса: текст, который можно держать в руках до глубокого входа.',
    isNew: false,
  },
  {
    id: '4',
    kicker: 'хроника',
    title: 'проект будет виден в движении',
    content: 'новости нужны не для шума. они фиксируют, как oazyse становится реальностью шаг за шагом.',
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
    <div className="fixed inset-0 z-[100] bg-neutral-950/92 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6">
      <div className="relative h-full w-full overflow-hidden bg-white text-neutral-950 shadow-2xl sm:h-[760px] sm:max-h-[92vh] sm:w-[390px] sm:rounded-[34px] sm:border sm:border-white/20">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {demoStories.map((_, idx) => (
          <div
            key={idx}
            className="h-0.5 flex-1 bg-neutral-200 rounded-full overflow-hidden"
          >
            <div
              className={cn(
                "h-full bg-neutral-950 transition-all duration-100",
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
          <div className="w-8 h-8 rounded-full bg-neutral-950 p-[1px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-[8px] text-neutral-950 font-medium">o°</span>
            </div>
          </div>
          <span className="text-neutral-950 text-sm font-medium">oazyse°</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-2 text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Story content */}
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div className="absolute inset-x-8 top-28 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">{currentStory.kicker}</span>
          <span className="h-px w-14 bg-neutral-200" />
        </div>
        <div className="px-9 text-left">
          <h2 className="text-[2.7rem] leading-[0.95] tracking-[-0.06em] text-neutral-950 mb-6">
            {currentStory.title}
          </h2>
          <p className="text-[1rem] leading-8 text-neutral-500">
            {currentStory.content}
          </p>
        </div>
        <div className="absolute bottom-24 left-8 right-8">
          <div className="h-px bg-gradient-to-r from-neutral-950 via-neutral-200 to-transparent" />
          <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-neutral-400">oazyse stories</p>
        </div>
      </div>

      {/* Navigation areas */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-8 h-8 text-neutral-400" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-8 h-8 text-neutral-400" />
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
                ? "bg-neutral-950 scale-125"
                : "bg-neutral-300 hover:bg-neutral-500"
            )}
          />
        ))}
      </div>
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
      {/* Animated ring for new stories - hollow circle */}
      <div
        className={cn(
          "w-3 h-3 rounded-full p-[1px] transition-all duration-300",
          hasNew
            ? "bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple animate-[spin_8s_linear_infinite] bg-[length:200%_100%]"
            : "bg-foreground/30"
        )}
      >
        <div className="w-full h-full rounded-full bg-background" />
      </div>
    </button>
  );
};

export const hasNewStories = () => {
  return demoStories.some(story => story.isNew);
};
