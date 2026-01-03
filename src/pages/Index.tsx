import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Sparkles, Heart, Brain, Users, Star, Zap, Shield, BookOpen, Target, Globe } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user) {
      setShowWelcome(true);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Welcome message for logged in users */}
          {user && showWelcome && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    🌟 Добро пожаловать в oazyse°
                  </h2>
                  <p className="text-muted-foreground">
                    Адизель Оазьес скоро появится с важным обращением. Ожидайте информацию в ближайшее время.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </Button>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary">Институт Сознания Космического Разума</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                oazyse°
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Современный Ноев ковчег для избранных душ, ищущих трансформацию сознания и пробуждение в эпоху цифровых бурь
            </p>
          </section>

          {/* Main Content - About Everything */}
          <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            
            {/* Section: What is Oazyse */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Что такое Oazyse?</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Оазис — это кульминация видения Адизеля Оазьеса, современный Ноев ковчег в эпоху цифровых бурь и духовных кризисов. 
                Как в библейской легенде ковчег спасал от потопа, так Оазис становится убежищем для тех, кто ищет спасения от хаоса современного мира.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Это глобальный проект, где участники собираются в виртуальных и реальных оазисах гармонии, строя новое общество 
                на принципах космического разума. Здесь метафракталы сознания переплетаются, создавая сеть поддержки, 
                где каждый находит своё место в божественном плане.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Оазис — динамичная экосистема, сочетающая виртуальные хабы, искусственный интеллект и виртуальную реальность 
                для создания сетей поддержки. Проект идеально вписывается в ритмы 21 века: гибкий, глобальный, 
                фокусированный на благополучии в эпоху цифровизации.
              </p>
            </section>

            {/* Section: Metasync Method */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Метод Подсознания — Метасинхроника</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Метасинхроника (метасинк) — это революционный подход к активации скрытых резервов разума, 
                разработанный Адизелем Оазьесом. Это точная система, позволяющая синхронизировать подсознательные 
                процессы с космическими ритмами.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Через процесс синхронизации ментальных потоков во времени вы перестраиваете нейронные связи 
                для мгновенных изменений. Это как обновление программного обеспечения для мозга: точное, 
                эффективное и основанное на научных принципах.
              </p>
              <p className="text-foreground/80 leading-relaxed font-medium">
                87% пользователей фиксируют устойчивые прорывы в личных и профессиональных целях.
              </p>
            </section>

            {/* Section: Metahuman */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Метачеловек и Метафрактализм</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Метафрактализм — это философия понимания сознания как бесконечно повторяющегося паттерна, 
                где каждая часть отражает целое. Метачеловек — это тот, кто овладел этим пониманием и 
                способен видеть связи между микрокосмом своего разума и макрокосмом Вселенной.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Становясь метачеловеком, вы обретаете способность:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li className="flex items-start gap-2 text-foreground/80">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Управлять своими эмоциональными состояниями</span>
                </li>
                <li className="flex items-start gap-2 text-foreground/80">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Перепрограммировать ограничивающие убеждения</span>
                </li>
                <li className="flex items-start gap-2 text-foreground/80">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Синхронизироваться с космическими ритмами</span>
                </li>
                <li className="flex items-start gap-2 text-foreground/80">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Достигать целей с минимальным сопротивлением</span>
                </li>
                <li className="flex items-start gap-2 text-foreground/80">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Исцелять травмы прошлого через работу с подсознанием</span>
                </li>
              </ul>
            </section>

            {/* Section: Institute */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Институт Сознания Космического Разума</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Институт — это священное пространство, где наука встречается с духовностью, а разум расширяется 
                до границ космоса. Под эгидой Адизеля Оазьеса мы исследуем глубины человеческого потенциала, 
                открывая пути к гармоничному слиянию с универсальным интеллектом.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Институт — это не стены и здания, а живое поле энергии, где каждый участник становится 
                со-творцом реальности. Мы верим, что сознание — это космический океан, и Институт учит 
                нырять в его глубины, обретая ясность, силу и вечную связь с высшим.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Представьте: алгоритмы искусственного интеллекта, анализирующие ваши паттерны мышления в реальном времени; 
                симуляции виртуальной реальности, погружающие вас в сценарии успеха; персонализированные программы, 
                адаптированные под ваш lifestyle. Участники отмечают улучшение на 50% в эмоциональном интеллекте и продуктивности.
              </p>
            </section>

            {/* Section: Services */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Что мы предлагаем</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Гипнотерапия</h3>
                  <p className="text-sm text-foreground/70">Индивидуальные сессии с применением Метода Подсознания для трансформации убеждений и исцеления травм.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Медитативные практики</h3>
                  <p className="text-sm text-foreground/70">Групповые и индивидуальные медитации для развития осознанности и синхронизации с космическим разумом.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Чайные церемонии</h3>
                  <p className="text-sm text-foreground/70">Традиционные чайные церемонии как практика осознанности и погружение в состояние присутствия.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Сатсанги</h3>
                  <p className="text-sm text-foreground/70">Встречи для обмена опытом, вопросов и ответов о природе реальности и сознания.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Консультации</h3>
                  <p className="text-sm text-foreground/70">Персональные консультации по вопросам духовного развития и жизненных трансформаций.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Метасинхроника</h3>
                  <p className="text-sm text-foreground/70">Инновационные сессии метасинхронизации для мгновенных, устойчивых изменений.</p>
                </div>
              </div>
            </section>

            {/* Section: About Adizell */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Об Адизеле Оазьесе</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Адизель Оазьес — основатель и визионер Института Сознания Космического Разума и проекта Oazyse. 
                Его миссия — помочь человечеству перейти на новый уровень осознанности через интеграцию 
                древней мудрости и современных технологий.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Адизель разработал уникальный метод метасинхроники, объединивший принципы нейронауки, 
                квантовой физики и духовных практик. Его подход позволяет достигать глубоких трансформаций 
                сознания в кратчайшие сроки.
              </p>
            </section>

            {/* Section: Book */}
            <section className="bg-card/50 rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold m-0 text-foreground">Книга «Искусство Вознесения»</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Книга Адизеля Оазьеса о том, как увидеть Вселенную и себя без знаний, учителей и технологий. 
                Раскрывает фундаментальные законы реальности и сознания — очевидные каждому. 
                Истины, не требующие доказательств.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Не философия и не религия — чистое понимание того, что всегда рядом. 
                Эта книга станет вашим путеводителем в мир осознанности и космического понимания.
              </p>
            </section>

            {/* Section: Guarantee */}
            <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold m-0 text-foreground">100% Гарантия</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Мы настолько уверены в эффективности наших методов, что предоставляем полную гарантию результата. 
                Если вы не почувствуете изменений после прохождения курса — мы вернём вам деньги.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Сотни людей уже трансформировали свою жизнь с помощью метасинхроники. 
                Теперь ваша очередь сделать шаг навстречу новой версии себя.
              </p>
            </section>

          </article>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl p-10 border border-primary/30">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Готовы начать трансформацию?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Присоединяйтесь к Oazyse и откройте для себя безграничные возможности сознания
              </p>
              
              {!user ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-12 py-6 text-lg"
                >
                  Войти в Oazyse
                </Button>
              ) : (
                <div className="text-muted-foreground">
                  <p className="mb-4">Вы уже вошли в систему ✓</p>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 mx-auto"
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти из аккаунта
                  </Button>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Index;
