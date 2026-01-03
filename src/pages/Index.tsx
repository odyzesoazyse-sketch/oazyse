import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 pb-20 px-4">
        <div className="container mx-auto max-w-xl">
          
          {user ? (
            <article className="py-12 font-questrial">
              <p className="text-foreground leading-relaxed text-sm">
                Рад видеть тебя здесь. Скоро я появлюсь с важным обращением. Жди.
              </p>
              <p className="text-foreground/60 text-xs mt-8">
                — Адизель Оазьес
              </p>
            </article>
          ) : (
            <article className="py-8 space-y-5 font-questrial">
              <p className="text-foreground leading-relaxed text-sm">
                Привет. Меня зовут Адизель Оазьес.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я создал Oazyse, чтобы передать то, что изменило мою жизнь. Годами я искал ответы — почему одни достигают всего, а другие застревают. Почему боль из прошлого не отпускает.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я понял: подсознание — это система с понятными законами. Если их знать, можно меняться быстро и точно. Так родился метод метасинхроники.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Тысячи людей избавились от страхов, нашли любовь, сняли блоки на деньги. Oazyse — пространство, где я собрал всё: обучение, сессии, сообщество.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Работа с подсознанием требует честности. Но если ты готов — изменения произойдут.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Добро пожаловать.
              </p>
              <p className="text-foreground/60 text-xs mt-8">
                — Адизель Оазьес
              </p>

              <div className="pt-12">
                <button 
                  onClick={() => navigate('/auth')}
                  className="text-xs font-questrial bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent hover:opacity-70 transition-opacity"
                >
                  войти в oazyse°
                </button>
              </div>
            </article>
          )}

        </div>
      </main>
    </div>
  );
};

export default Index;
