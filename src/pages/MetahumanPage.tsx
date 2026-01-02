import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Brain, Zap, Shield, CheckCircle2, Star } from 'lucide-react';

const MetahumanPage = () => {
  const navigate = useNavigate();

  const benefits = [
    'Полный контроль над сознанием и эмоциями',
    'Освобождение от травм и ограничений прошлого',
    'Создание желаемой реальности',
    'Гармония внутреннего состояния',
    'Раскрытие скрытого потенциала',
    'Жизнь без страхов и блоков'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="flex items-center h-12 px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>назад</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="pt-16 pb-12 px-4 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-green via-neon-purple to-neon-green flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent">
              мета-человек
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Состояние абсолютного контроля над своим сознанием
          </p>
        </section>

        {/* What is Metahuman */}
        <section className="p-4 border border-neon-purple/30 rounded mb-4">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-neon-purple" />
            что такое мета-человек?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Мета-человек — это человек, достигший полного контроля над своим сознанием. 
            Это состояние, когда внутри нет скрытых дефицитов, страхов или ощущения «чего-то не хватает». 
            Каждый может готовить, но не каждый становится шеф-поваром. 
            Каждый может управлять своим сознанием, но не каждый становится мета-человеком.
          </p>
        </section>

        {/* Metafractalism Method */}
        <section className="p-4 border border-neon-green/30 rounded mb-4">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-green" />
            метод метафракталлизма
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Метафракталлизм — это революционный метод перестройки сознания с такой же точностью, 
            с какой мы передвигаем предметы или обновляем программы компьютера. 
            Простое, безопасное и универсальное открытие, сравнимое с открытием пенициллина — 
            оно всегда было «на виду», но никогда прежде не было систематизировано.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <Shield className="w-4 h-4 text-neon-green" />
            <span className="text-neon-green">100% безопасный метод</span>
          </div>
        </section>

        {/* Benefits */}
        <section className="p-4 border border-neon-purple/30 rounded mb-4">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-neon-purple" />
            что вы получите
          </h2>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="p-4 bg-gradient-to-br from-neon-purple/10 to-neon-green/10 border border-neon-purple/30 rounded mb-6">
          <h2 className="text-base font-medium mb-2 text-center">гарантия результата</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Метод метафракталлизма работает как «выкуп» из прошлой жизни с гарантией 100%. 
            Если вы не увидите изменений — мы вернём деньги.
          </p>
        </section>

        {/* CTA */}
        <button
          onClick={() => navigate('/quiz')}
          className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-green text-white font-medium rounded hover:opacity-90 transition-opacity"
        >
          начать трансформацию →
        </button>
      </div>
    </div>
  );
};

export default MetahumanPage;
