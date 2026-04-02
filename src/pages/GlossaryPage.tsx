import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const terms = [
  {
    word: 'оазис',
    def: 'живое пространство для тех кто выбрал жить из полноты. не компания. не религия. не движение. нечто большее.',
  },
  {
    word: 'метасинхроника',
    def: 'аппаратное изменение сознания. технология работы с подсознанием на глубинном уровне. не терапия. не медитация. инженерия внутреннего состояния.',
  },
  {
    word: 'метасинк',
    def: 'короткое название метасинхроники. для разговорного использования.',
  },
  {
    word: 'метафрактализм',
    def: 'философия и движение. твоё внутреннее состояние является фракталом внешней реальности. меняешь внутри — меняется снаружи. выходит за рамки логики в 4D и 5D мышление.',
  },
  {
    word: 'космический человек',
    def: 'состояние полной внутренней свободы. не звание. направление движения. шкала 0–100.',
  },
  {
    word: 'институт сознания космического разума',
    def: 'исследовательское сердце оазиса. изучает природу сознания, реальности, космического разума. пишется строчными буквами.',
  },
  {
    word: 'мини-оазис',
    def: 'живое пространство которое строит каждый участник вокруг себя.',
  },
  {
    word: 'аппаратное изменение',
    def: 'трансформация на уровне источника а не симптома. в отличие от программного изменения которое работает с поведением.',
  },
  {
    word: 'внутренний фрактал',
    def: 'текущее состояние сознания которое определяет внешнюю реальность.',
  },
  {
    word: 'момент перехода',
    def: 'личная точка когда человек сам замечает что живёт иначе. фиксируется: "до я был... теперь я..."',
  },
  {
    word: 'космический разум',
    def: 'то что выходит за пределы трёхмерного восприятия. больше космоса. больше вселенной. та нить которую невозможно поймать логикой — но можно исследовать.',
  },
  {
    word: 'искусство вознесения',
    def: 'книга Adizele Oazyse. содержит всё.',
  },
];

const GlossaryPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '50vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>для новой реальности нужны новые слова</span>
          <h1 className="l-hero-title">язык оазиса</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">старый язык описывает старый мир.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* ГЛОССАРИЙ */}
      <section className="l-section" style={{ paddingTop: '4rem' }}>
        <span className="l-label" data-reveal>[ глоссарий ]</span>
        <div data-reveal data-delay="1">
          {terms.map((t) => (
            <div key={t.word} className="l-term">
              <span className="l-term-word">{t.word}</span>
              <p className="l-term-def">{t.def}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ теперь ты знаешь язык ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          слова — это карта. оазис — это территория.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/join" className="l-btn">войти в оазис</Link>
          <Link to="/method" className="l-btn-ghost">узнать метод →</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default GlossaryPage;
