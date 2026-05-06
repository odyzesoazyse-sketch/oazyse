import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';
import LeadForm from '@/components/LeadForm';

const methodSteps = [
  ['01', 'запрос', 'мы берём не красивую цель, а точку, где жизнь реально повторяет старый сценарий.'],
  ['02', 'источник', 'смотрим, из какого внутреннего состояния человек принимает решения и строит жизнь.'],
  ['03', 'подсознательный механизм', 'находим не мнение о проблеме, а программу, которая продолжает её воспроизводить.'],
  ['04', 'пересборка', 'меняем внутреннюю опору, чтобы новое действие стало возможным не усилием, а другим состоянием.'],
];

const plans = [
  ['сейчас', 'открыть публичный вход в Oazyse°, метод, заявки и личные сессии.'],
  ['следующий шаг', 'собрать первый круг людей, которые понимают масштаб и готовы входить не зрителями, а участниками.'],
  ['дальше', 'оформить доктрину, путь участника, тексты метода, книгу, институт и будущий AI-проводник Oazyse°.'],
];

const forms = [
  ['институт', 'исследование сознания, метода, языка и новой человеческой среды.'],
  ['метод', 'практика работы с подсознательным механизмом, который держит повторяющийся сценарий.'],
  ['среда', 'люди, которые узнают друг друга не по роли и выгоде, а по внутреннему уровню и вектору.'],
  ['технологии', 'будущий интеллект Oazyse° как проводник, который помогает человеку видеть путь и состояние.'],
];

const Index = () => {
  return (
    <LandingShell>
      <section className="l-hero" style={{ paddingTop: '7rem' }}>
        <div data-reveal>
          <p
            className="l-mono"
            style={{ marginBottom: '2rem', color: 'hsl(var(--muted-foreground)/0.45)', textAlign: 'center' }}
          >
            институт сознания космического разума открывает миру
          </p>
          <h1 className="l-logo">oazyse°</h1>
        </div>

        <p className="l-hero-sub" data-reveal data-delay="1">
          архитектура нового сознания.
        </p>

        <p className="l-text" data-reveal data-delay="2" style={{ maxWidth: '44rem', textAlign: 'center', marginBottom: '2rem' }}>
          Мир нельзя пересобрать из того же сознания, которое привело его к распаду. Oazyse° создаётся как новая точка сборки: среда, где внутренний уровень человека становится основанием отношений, дела, культуры, технологий и будущего.
        </p>

        <div data-reveal data-delay="3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#apply" className="l-btn">оставить заявку</a>
          <Link to="/session" className="l-btn-ghost">личные сессии →</Link>
        </div>

        <div className="l-hero-line" style={{ marginTop: '5rem' }} data-reveal data-delay="4" />
        <p className="l-hero-tag">не убежище от мира. начало мира, который приходит дальше.</p>
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что открывается сейчас</span>
        <h2 className="l-title" data-reveal data-delay="1">Oazyse° — это не сообщество по интересам.<br />Это прообраз новой человеческой среды.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Мы открываем первую публичную форму Oazyse°: место, где можно понять замысел, увидеть метод, войти в список первых участников и подать заявку на личную работу.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          Главный тезис простой и жёсткий: новый мир не строится из старого сознания. Если человек остаётся внутренне раздробленным, он будет создавать вокруг себя такие же раздробленные отношения, системы и решения.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          Поэтому Oazyse° начинается не с внешней платформы, а с источника: из какого состояния человек живёт, выбирает, строит, любит, работает и влияет на мир.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">сознание здесь не тема для разговора. сознание становится строительным материалом новой реальности.</p>
        </div>
      </section>

      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 02 ] — метод</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>метод работает не с поверхностью проблемы,<br />а с внутренним механизмом, который её повторяет.</h2>
        <p className="l-text" data-reveal data-delay="2" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem' }}>
          В обычной жизни человек часто борется с последствиями: тревогой, зависимостью, потолком в деньгах, отношениями, прокрастинацией, усталостью, страхом проявиться. Метод Oazyse° идёт глубже: к подсознательной программе, из которой сценарий снова становится реальностью.
        </p>
        <div data-reveal data-delay="3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {methodSteps.map(([num, title, text]) => (
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
        <span className="l-label" data-reveal>[ 03 ] — формы Oazyse°</span>
        <h2 className="l-title" data-reveal data-delay="1">мы не запускаем одну услугу.<br />мы собираем систему.</h2>
        <p className="l-text" data-reveal data-delay="2">
          У Oazyse° будет несколько форм. Они нужны не для широты ради широты, а чтобы одна задача могла стать реальностью: человек перестаёт быть потребителем мира и становится источником мира более высокого порядка.
        </p>
        <div style={{ marginTop: '2rem' }} data-reveal data-delay="3">
          {forms.map(([title, text]) => (
            <div key={title} className="l-term">
              <span className="l-term-word">{title}</span>
              <p className="l-term-def">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 04 ] — планы</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>план не в том, чтобы стать ещё одним проектом.<br />план — стать новой точкой сборки.</h2>
        <div data-reveal data-delay="2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
          {plans.map(([title, text]) => (
            <div key={title} className="l-card-hover">
              <span className="l-term-word">{title}</span>
              <p className="l-term-def">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 05 ] — личная работа</span>
        <h2 className="l-title" data-reveal data-delay="1">первый живой вход — личная сессия работы с подсознанием.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Если у человека есть конкретный повторяющийся сценарий, ему не всегда нужно сначала читать всю архитектуру проекта. Иногда правильный вход — одна точная работа с запросом, чтобы почувствовать метод не как текст, а как изменение внутреннего механизма.
        </p>
        <div data-reveal data-delay="3" style={{ marginTop: '2rem' }}>
          <Link to="/session" className="l-btn">страница личных сессий</Link>
        </div>
      </section>

      <Divider />
      <section id="apply" className="l-section">
        <span className="l-label" data-reveal>[ 06 ] — заявка</span>
        <h2 className="l-title" data-reveal data-delay="1">если ты узнаёшь этот вектор,<br />оставь контакт.</h2>
        <p className="l-text" data-reveal data-delay="2">
          Сейчас нам нужны не случайные регистрации, а первые люди, которые чувствуют масштаб Oazyse° и хотят войти ближе: как участники среды, будущие носители метода, люди первого круга или через личную работу.
        </p>
        <div data-reveal data-delay="3">
          <LeadForm
            status="oazyse-public-application"
            title="заявка в Oazyse°"
            description="Оставь имя и контакт. Дальше мы выйдем на связь и поймём, какой вход тебе подходит: первый круг, личная сессия, метод или ожидание следующего этапа."
            submitLabel="отправить заявку"
          />
        </div>
      </section>

      <Divider />
    </LandingShell>
  );
};

export default Index;
