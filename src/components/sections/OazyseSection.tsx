import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const OazyseSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Базовая валидация
    if (!formData.name || !formData.email || !formData.motivation) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
      });
      return;
    }

    toast({
      title: 'Заявка отправлена',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setFormData({ name: '', email: '', motivation: '' });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-bold uppercase text-base md:text-lg">О ПРОЕКТЕ OAZYSE</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Oazyse — это пространство для развития сознания и практики осознанности. 
          Мы объединяем древние традиции медитации с современными подходами к изучению 
          человеческого разума. Наша миссия — помочь каждому раскрыть потенциал своего сознания 
          и достичь гармонии с собой и миром.
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          Проект включает практики медитации, работу с сознанием, исследование эзотерических 
          знаний и терапевтические методы, которые помогают трансформировать жизнь.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold uppercase text-base md:text-lg">ПРИСОЕДИНИТЬСЯ К ПРОЕКТУ</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-foreground rounded-none"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-foreground rounded-none"
          />
          <Input
            placeholder="Мотивация"
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className="border-foreground rounded-none"
          />
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none">
            ОТПРАВИТЬ
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;
