import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizReportProps {
  report: string;
  isLoading: boolean;
  codeName: string;
}

export function QuizReport({ report, isLoading, codeName }: QuizReportProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      toast({ title: 'Скопировано в буфер обмена' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Ошибка копирования', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Генерация досье...</h2>
          <p className="text-muted-foreground">
            ИИ уровня «Бог-Наблюдатель» анализирует твои ответы
          </p>
          <p className="text-sm text-muted-foreground">
            Это может занять до 2 минут
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">ЗАКРЫТОЕ ДОСЬЕ</h1>
          <p className="text-xl text-primary">{codeName}</p>
          <p className="text-sm text-muted-foreground">
            Институт Oazyse • Омега-300
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Скопировано' : 'Копировать'}
          </Button>
        </div>

        <div className="prose prose-invert max-w-none bg-card border border-border rounded-lg p-6">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {report}
          </div>
        </div>

        <div className="text-center space-y-4 pt-8">
          <p className="text-sm text-muted-foreground">
            Это досье создано на основе 300 вопросов и является уникальным документом.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
}
