import { useState } from 'react';
import { Shield, Star, ChevronRight, X, ChevronLeft } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  topic: string;
  shortText: string;
  fullText: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Анна",
    age: 32,
    topic: "Тревога",
    shortText: "Избавилась от панических атак",
    fullText: "После нескольких сеансов гипнотерапии я наконец-то избавилась от постоянной тревоги и панических атак. Раньше я не могла нормально спать и работать, а теперь чувствую себя спокойной и уверенной. Спасибо огромное за профессиональную помощь!"
  },
  {
    id: 2,
    name: "Дмитрий",
    age: 45,
    topic: "Курение",
    shortText: "10 лет курения → 6 месяцев без сигарет",
    fullText: "Боролся с курением больше 10 лет. После курса гипнотерапии тяга к сигаретам исчезла полностью. Уже 6 месяцев не курю, чувствую себя здоровее и энергичнее. Рекомендую всем, кто хочет бросить вредные привычки."
  },
  {
    id: 3,
    name: "Екатерина",
    age: 28,
    topic: "Вес",
    shortText: "Сбросила 12 кг без диет",
    fullText: "Обратилась с проблемой лишнего веса и эмоционального переедания. Гипнотерапия помогла разобраться с внутренними блоками, теперь ем осознанно и сбросила 12 кг без диет. Жизнь стала легче и радостнее!"
  },
  {
    id: 4,
    name: "Сергей",
    age: 37,
    topic: "Карьера",
    shortText: "Преодолел страх выступлений → повышение",
    fullText: "Долгое время страдал от низкой самооценки и страха публичных выступлений. После сеансов я спокойно выступаю на работе, получил повышение. Это реальное изменение в мышлении — спасибо!"
  },
  {
    id: 5,
    name: "Ольга",
    age: 40,
    topic: "Отношения",
    shortText: "Гармония в браке после проработки травм",
    fullText: "Проблемы в отношениях мучили годами — ревность, недоверие. Гипнотерапия помогла проработать прошлые травмы, теперь с мужем всё гармонично. Чувствую себя любимой и счастливой."
  },
  {
    id: 6,
    name: "Алексей",
    age: 29,
    topic: "Сон",
    shortText: "Победил бессонницу без таблеток",
    fullText: "Хроническая бессонница и стресс от работы. После гипноза сплю как младенец, энергия на весь день. Методы работают мягко и эффективно, без таблеток."
  },
  {
    id: 7,
    name: "Мария",
    age: 35,
    topic: "Фобия",
    shortText: "4 сеанса → страх вождения ушёл",
    fullText: "Страх вождения после аварии не давал сесть за руль. За 4 сеанса страх ушёл, теперь езжу спокойно и с удовольствием. Это магия, но реальная!"
  },
  {
    id: 8,
    name: "Игорь",
    age: 50,
    topic: "Зависимость",
    shortText: "Год трезвости, семья вернулась",
    fullText: "Алкогольная зависимость разрушала жизнь. Гипнотерапия дала мотивацию и внутреннюю силу отказаться. Трезв уже год, семья вернулась. Благодарен от души."
  },
  {
    id: 9,
    name: "Наталья",
    age: 26,
    topic: "Социофобия",
    shortText: "Легко общаюсь, нашла друзей",
    fullText: "Социофобия мешала общению и карьере. Теперь легко знакомлюсь с людьми, хожу на встречи. Самооценка выросла в разы — спасибо за трансформацию!"
  },
  {
    id: 10,
    name: "Виктор",
    age: 42,
    topic: "Бизнес",
    shortText: "Доход вырос в 2 раза",
    fullText: "Прокрастинация и лень тормозили бизнес. После проработки начал действовать решительно, доход вырос в 2 раза. Гипноз — лучшая инвестиция в себя."
  },
  {
    id: 11,
    name: "Светлана",
    age: 38,
    topic: "Депрессия",
    shortText: "Нашла радость после развода",
    fullText: "Депрессия после развода. Сеансы помогли отпустить прошлое, найти радость в мелочах. Теперь живу полной жизнью, полна планов."
  },
  {
    id: 12,
    name: "Павел",
    age: 31,
    topic: "Полёты",
    shortText: "Слетал в отпуск без страха",
    fullText: "Страх высоты и полётов. После гипнотерапии слетал в отпуск без страха. Мир стал больше — рекомендую всем с фобиями!"
  }
];

const SocialProof = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const anonymizeName = (name: string) => {
    return name[0] + '***';
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < testimonials.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      {/* Main Section */}
      <section className="p-4 border border-neon-green/30 rounded hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.15)] transition-all">
        {/* Guarantee Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-neon-green" />
          <span className="text-[9px] uppercase tracking-[0.1em] text-neon-green">Гарантия результата</span>
        </div>
        
        <h3 className="text-base font-medium mb-1">Единственный, кто даёт гарантию</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Я уверен в методе настолько, что гарантирую результат. Если не поможет — верну деньги.
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 py-2 border-y border-border/30">
          <div className="text-center">
            <div className="text-lg font-medium text-neon-purple">500+</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-neon-green">94%</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">успех</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5">
              <span className="text-lg font-medium">4.9</span>
              <Star className="w-3 h-3 fill-neon-green text-neon-green" />
            </div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">рейтинг</div>
          </div>
        </div>

        {/* Testimonials Preview */}
        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground block mb-2">Истории трансформации</span>
        <div className="space-y-1.5">
          {testimonials.slice(0, 4).map((t, index) => (
            <div
              key={t.id}
              onClick={() => setSelectedIndex(index)}
              className="flex items-center gap-2 py-1.5 cursor-pointer group"
            >
              <span className="text-[10px] text-neon-purple/70 font-mono w-5">{anonymizeName(t.name)}</span>
              <span className="text-[10px] text-muted-foreground">{t.age}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-neon-green/10 text-neon-green rounded">{t.topic}</span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex-1 truncate">{t.shortText}</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-neon-purple group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>

        <button
          onClick={() => setSelectedIndex(0)}
          className="w-full mt-3 py-2 text-[10px] uppercase tracking-[0.1em] text-neon-purple border border-neon-purple/30 rounded hover:bg-neon-purple/10 transition-colors"
        >
          Все {testimonials.length} историй
        </button>
      </section>

      {/* Full Screen Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              История {selectedIndex + 1} из {testimonials.length}
            </span>
            <button
              onClick={() => setSelectedIndex(null)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-lg mx-auto">
              {/* Topic Badge */}
              <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-[0.1em] bg-neon-green/10 text-neon-green rounded mb-4">
                {testimonials[selectedIndex].topic}
              </span>

              {/* Name & Age */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium">{testimonials[selectedIndex].name}</span>
                <span className="text-sm text-muted-foreground">{testimonials[selectedIndex].age} лет</span>
              </div>

              {/* Full Text */}
              <p className="text-base leading-relaxed text-foreground/90">
                "{testimonials[selectedIndex].fullText}"
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-neon-green text-neon-green" />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 border-t border-border/30">
            <button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className="flex items-center gap-1 px-3 py-2 text-xs disabled:opacity-30 hover:text-neon-purple transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </button>
            
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === selectedIndex ? 'bg-neon-purple' : 'bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedIndex === testimonials.length - 1}
              className="flex items-center gap-1 px-3 py-2 text-xs disabled:opacity-30 hover:text-neon-purple transition-colors"
            >
              Далее
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialProof;
