import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';
import LeadForm from '@/components/LeadForm';

const requests = [
  ['тревога и страх', 'когда тело будто заранее живёт в опасности, даже если внешне всё уже спокойно.'],
  ['деньги и потолок', 'когда человек много делает, но внутри есть запрет брать больше, проявляться сильнее и выходить на новый уровень.'],
  ['отношения', 'когда повторяется один сценарий: зависимость, холод, ревность, потеря себя или выбор недоступных людей.'],
  ['энергия и воля', 'когда ум понимает, что пора действовать, но внутри нет движения, ясности и внутреннего разрешения.'],
  ['переход', 'когда старая жизнь уже не подходит, а новая ещё не собрана и нужен точный внутренний разворот.'],
];

const process = [
  ['01', 'точный запрос', 'мы отделяем настоящую точку застревания от красивой формулировки и поверхностной истории.'],
  ['02', 'состояние внимания', 'человек остаётся в контакте с собой, слышит процесс и может остановить работу в любой момент.'],
  ['03', 'подсознательная программа', 'мы ищем внутренний механизм, который заставляет старый сценарий повторяться снова.'],
  ['04', 'пересборка опоры', 'работа направлена на изменение состояния, из которого человек потом выбирает и действует.'],
  ['05', 'фиксация', 'после сессии остаётся ясный следующий шаг, чтобы изменение не осталось впечатлением.'],
];

const principles = [
  ['не разговор ради облегчения', 'сессия нужна не для того, чтобы красиво обсудить проблему, а чтобы приблизиться к механизму, который её создаёт.'],
  ['не потеря контроля', 'человек не исчезает и не становится объектом. работа строится через внимание, контакт и точность.'],
  ['один запрос', 'лучше глубоко взять одну точку, чем распылить работу на десять тем и уйти с красивым туманом.'],
  ['результат важнее ритуала', 'если после работы нет изменения в отношении к запросу, формат не выполнил свою задачу.'],
];

const SessionPage = () => {
  return (
    <LandingShell>
      <section className="l-hero" style={{ minHeight: '78vh', paddingTop: '7rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>
            личная работа с подсознанием
          </span>
          <h1 className="l-hero-title">сессия,<br />где меняется не история,<br />а источник сценария.</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">
          один запрос. глубокое внимание. подсознательный механизм. новая внутренняя опора.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ maxWidth: '42rem', textAlign: 'center', marginBottom: '2rem' }}>
          Эта страница для тех, кто хочет не просто понять Oazyse° как идею, а войти в метод через личную работу с Adizele.
        </p>
        <div data-reveal data-delay="3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#session-apply" className="l-btn">оставить заявку</a>
          <Link to="/" className="l-btn-ghost">о Oazyse° →</Link>
        </div>
        <div className="l-hero-line" style={{ marginTop: '4rem' }} data-reveal data-delay="4" />
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что это</span>
        <h2 className="l-title" data-reveal data-delay="1">это не консультация,<br />где тебе объясняют твою жизнь.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Личная сессия — это работа с тем местом, где повторяющийся сценарий держится внутри человека. Не на уровне мнения. Не на уровне мотивации. Не на уровне “я всё понял, но продолжаю делать по-старому”.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          Мы идём к подсознательному механизму: к той внутренней программе, из которой человек снова выбирает страх, сжимается перед деньгами, теряет себя в отношениях, откладывает действие или не разрешает себе новый уровень жизни.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">цель сессии — не красивое осознание. цель — сдвиг внутренней опоры, из которой потом меняется действие.</p>
        </div>
      </section>

      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 02 ] — с чем приходят</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>обычно человек приходит<br />с тем, что уже слишком долго повторяется.</h2>
        <div data-reveal data-delay="2" style={{ marginTop: '2.5rem' }}>
          {requests.map(([title, text]) => (
            <div key={title} className="l-term">
              <span className="l-term-word">{title}</span>
              <p className="l-term-def">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — как проходит</span>
        <h2 className="l-title" data-reveal data-delay="1">бережно.<br />точно.<br />без театра.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Формат: онлайн, один главный запрос, 90-120 минут. Мы не распыляемся на всю биографию. Мы берём одну точку, в которой видно, как человек создаёт свою повторяющуюся реальность.
        </p>
        <div data-reveal data-delay="3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
          {process.map(([num, title, text]) => (
            <div key={num} className="l-card-hover">
              <span className="l-label" style={{ marginBottom: '1rem' }}>{num}</span>
              <span className="l-term-word">{title}</span>
              <p className="l-term-def">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — принципы</span>
        <h2 className="l-title" data-reveal data-delay="1">здесь важна точность,<br />а не мистическая упаковка.</h2>
        <div data-reveal data-delay="2" style={{ marginTop: '2rem' }}>
          {principles.map(([title, text]) => (
            <div key={title} className="l-term">
              <span className="l-term-word">{title}</span>
              <p className="l-term-def">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 05 ] — кому подходит</span>
        <h2 className="l-title" data-reveal data-delay="1">подходит тем,<br />кто готов смотреть в механизм.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Сессия подходит, если у тебя есть конкретный запрос, который уже надоело объяснять себе словами. Если ты чувствуешь, что проблема живёт глубже логики, глубже советов и глубже очередного обещания “начать с понедельника”.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          Она не подходит, если тебе нужно просто поговорить, получить чужое решение вместо своего или оставить всё как есть, но почувствовать красивое облегчение на один вечер.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">один запрос. одна глубокая работа. ясный следующий шаг после сессии.</p>
        </div>
      </section>

      <Divider />
      <section id="session-apply" className="l-section">
        <span className="l-label" data-reveal>[ 06 ] — заявка на сессию</span>
        <h2 className="l-title" data-reveal data-delay="1">если время пришло,<br />оставь контакт.</h2>
        <p className="l-text" data-reveal data-delay="2">
          После заявки мы свяжемся и уточним запрос. Если формат подходит, договоримся о времени. Если нет, лучше сказать это сразу, чем продавать человеку процесс, который не нужен.
        </p>
        <div data-reveal data-delay="3">
          <LeadForm
            status="personal-subconscious-session"
            title="заявка на личную сессию"
            description="Оставь имя и контакт. В следующем сообщении мы уточним запрос и поймём, подходит ли формат личной работы."
            submitLabel="отправить заявку"
          />
        </div>
        <div data-reveal data-delay="4" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="https://t.me/adizele" target="_blank" rel="noopener noreferrer" className="l-btn-ghost">или написать напрямую в Telegram →</a>
        </div>
      </section>

      <Divider />
    </LandingShell>
  );
};

export default SessionPage;
