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
        <div className="container mx-auto max-w-2xl">
          
          {user ? (
            // Logged in - micro message
            <article className="py-12">
              <p className="text-foreground leading-relaxed text-sm">
                Рад видеть тебя здесь. Скоро я появлюсь с важным обращением. Жди.
              </p>
              <p className="text-foreground/60 text-xs mt-8">
                — Адизель Оазьес
              </p>
            </article>
          ) : (
            // Not logged in - big personal message
            <article className="py-8 space-y-6">
              <p className="text-foreground leading-relaxed text-sm">
                Привет.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Меня зовут Адизель Оазьес. Я создал этот проект, чтобы передать тебе то, что изменило мою жизнь.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Много лет я искал ответы на вопросы, которые не давали мне покоя. Почему одни люди достигают всего, а другие застревают на месте? Почему мы повторяем одни и те же ошибки? Почему боль из прошлого не отпускает, сколько бы времени ни прошло?
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я прошёл через всё: терапию, медитации, книги, семинары, духовные практики. Что-то помогало временно, что-то не работало вовсе. Но однажды я обнаружил нечто, что изменило всё.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я понял, что наше подсознание — это не чёрный ящик, который нужно годами расшифровывать. Это система, которая работает по определённым законам. И если знать эти законы, можно менять себя быстро и точно.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Так родился метод метасинхроники. Это не магия и не религия. Это практическая система работы с подсознанием, которая объединяет принципы нейронауки, когнитивных технологий и глубинной психологии.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                За годы работы я помог тысячам людей. Люди избавлялись от страхов, которые преследовали их десятилетиями. Находили любовь после череды неудачных отношений. Зарабатывали в разы больше, сняв внутренние блоки на деньги. Исцеляли травмы, которые считали неизлечимыми.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Oazyse — это пространство, где я собрал всё, что знаю. Здесь ты найдёшь обучение методу, сессии с практиками, сообщество людей, которые идут тем же путём.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я не обещаю, что будет легко. Работа с подсознанием требует честности с собой. Но я обещаю, что если ты готов, изменения произойдут.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Институт Сознания Космического Разума — это не здание и не организация. Это живое поле энергии, где каждый участник становится со-творцом своей реальности. Мы исследуем глубины человеческого потенциала, открывая пути к гармонии с собой и миром.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Метачеловек — это не сверхспособности из фантастики. Это состояние, когда ты перестаёшь быть рабом своих реакций и становишься хозяином своей жизни. Когда ты видишь паттерны, которые раньше управляли тобой, и можешь их менять.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я написал книгу "Искусство Вознесения", где изложил основы метода. Там нет воды и общих фраз — только практика, которую можно применять сразу.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Если ты читаешь это, значит ты уже на пути. Возможно, ты искал именно это. Возможно, случайно наткнулся. Случайностей не бывает.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Я даю 100% гарантию на свою работу. Если метод не сработает — верну деньги. За все годы практики возвратов было меньше 1%. Потому что это работает.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Не откладывай. Каждый день промедления — это ещё один день жизни на автопилоте. Ты заслуживаешь большего.
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                Добро пожаловать в Oazyse.
              </p>
              <p className="text-foreground/60 text-xs mt-8">
                — Адизель Оазьес
              </p>

              {/* Enter button */}
              <div className="pt-12">
                <button 
                  onClick={() => navigate('/auth')}
                  className="text-foreground text-xs hover:text-foreground/70 transition-colors"
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
