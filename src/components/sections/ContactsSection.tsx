import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactsSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
      });
      return;
    }

    toast({
      title: 'Сообщение отправлено',
      description: 'Мы ответим вам в ближайшее время',
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-8">
      <h2 className="font-bold uppercase text-base md:text-lg">КОНТАКТЫ</h2>
      
      <div className="space-y-4">
        <p className="text-sm md:text-base leading-relaxed">
          Свяжитесь с нами для получения дополнительной информации о проекте, записи 
          на консультацию или участия в программах.
        </p>
        <p className="text-sm md:text-base">
          <span className="font-bold">Email:</span> contact@oazyse.ooo
        </p>
      </div>

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
          placeholder="Сообщение"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="border-foreground rounded-none"
        />
        <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none">
          ОТПРАВИТЬ
        </Button>
      </form>
    </div>
  );
};

export default ContactsSection;
