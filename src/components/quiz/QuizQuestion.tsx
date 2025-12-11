import { QuizQuestion as QuizQuestionType } from './quizData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface QuizQuestionProps {
  question: QuizQuestionType;
  value: any;
  onChange: (field: string, value: any) => void;
  questionNumber: number;
}

export function QuizQuestionComponent({ question, value, onChange, questionNumber }: QuizQuestionProps) {
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(question.field, e.target.value)}
            className="bg-background border-border"
            placeholder="Введите ответ..."
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(question.field, e.target.value ? parseInt(e.target.value) : null)}
            min={question.min}
            max={question.max}
            className="bg-background border-border"
            placeholder="Введите число..."
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(question.field, e.target.value)}
            className="bg-background border-border min-h-[100px]"
            placeholder="Напишите подробно..."
          />
        );
      
      case 'select':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={(val) => onChange(question.field, val)}
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'boolean':
        return (
          <RadioGroup
            value={value === true ? 'yes' : value === false ? 'no' : ''}
            onValueChange={(val) => onChange(question.field, val === 'yes')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1 justify-center">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`} className="cursor-pointer">Да</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1 justify-center">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`} className="cursor-pointer">Нет</Label>
            </div>
          </RadioGroup>
        );
      
      case 'slider':
        return (
          <div className="space-y-4">
            <Slider
              value={[value ?? question.min ?? 0]}
              onValueChange={([val]) => onChange(question.field, val)}
              min={question.min ?? 0}
              max={question.max ?? 10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.min ?? 0}</span>
              <span className="text-lg font-bold text-foreground">{value ?? question.min ?? 0}</span>
              <span>{question.max ?? 10}</span>
            </div>
          </div>
        );
      
      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange(question.field, [...selectedValues, option]);
                    } else {
                      onChange(question.field, selectedValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
          #{questionNumber}
        </span>
        <h3 className="text-lg font-medium flex-1">
          {question.question}
          {question.required && <span className="text-destructive ml-1">*</span>}
        </h3>
      </div>
      {renderInput()}
    </div>
  );
}
