import { useState } from 'react';
import { X } from 'lucide-react';

type Lang = 'ru' | 'en' | 'es' | 'fr' | 'pt';
type Panel = 'access' | 'about' | 'places' | 'authors' | 'reviews';

const ACCESS_CODE = 'PEOPLE-X-047';
const BOT_URL = 'https://t.me/oazysebot';

const languages: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
];

const copy = {
  ru: {
    mark: 'Люди Х',
    label: 'закрытые ретриты / метасинхроника / тело',
    line: 'Премиальные ретриты для глубокой работы с подсознанием, телом и состоянием.',
    nav: { access: 'вход', about: 'суть', places: 'места', authors: 'авторы', reviews: 'отзывы' },
    panelTitles: { access: 'секретный вход', about: 'суть проекта', places: 'локации', authors: 'авторы', reviews: 'обратная связь' },
    access: [`Код: ${ACCESS_CODE}`, 'Отправьте его в @oazysebot, чтобы получить закрытую информацию.'],
    about: ['Малые группы. Подготовка. Церемониальная работа. Камбо. Интеграция.', 'Формат мягкий, приватный и профессиональный. Без лишнего шума.'],
    places: ['Мексика', 'Ямайка', 'Бали', 'Индия'],
    authors: ['Адизель Оазьес — автор метасинхроники.', 'Абу — проводник телесной и ритуальной линии.'],
    reviews: ['Точно. Глубоко. Без театра.', 'После работы стало тихо внутри.', 'Тело отпустило напряжение. Сознание стало яснее.'],
    telegram: 'открыть Telegram',
  },
  en: {
    mark: 'People X',
    label: 'private retreats / metasynchronics / body',
    line: 'Premium retreats for deep work with the subconscious, body, and state.',
    nav: { access: 'entry', about: 'essence', places: 'places', authors: 'authors', reviews: 'reviews' },
    panelTitles: { access: 'private entry', about: 'project essence', places: 'locations', authors: 'authors', reviews: 'feedback' },
    access: [`Code: ${ACCESS_CODE}`, 'Send it to @oazysebot to receive private information.'],
    about: ['Small groups. Preparation. Ceremonial work. Kambo. Integration.', 'Soft, private, professional. No noise.'],
    places: ['Mexico', 'Jamaica', 'Bali', 'India'],
    authors: ['Adizele Oazyse — author of metasynchronics.', 'Abu — guide of the body and ritual line.'],
    reviews: ['Precise. Deep. No theatre.', 'After the work, it became quiet inside.', 'The body released tension. Consciousness became clearer.'],
    telegram: 'open Telegram',
  },
  es: {
    mark: 'Personas X',
    label: 'retiros privados / metasincronica / cuerpo',
    line: 'Retiros premium para trabajo profundo con subconsciente, cuerpo y estado interno.',
    nav: { access: 'entrada', about: 'esencia', places: 'lugares', authors: 'autores', reviews: 'resenas' },
    panelTitles: { access: 'entrada privada', about: 'esencia del proyecto', places: 'lugares', authors: 'autores', reviews: 'feedback' },
    access: [`Codigo: ${ACCESS_CODE}`, 'Envialo a @oazysebot para recibir informacion privada.'],
    about: ['Grupos pequenos. Preparacion. Trabajo ceremonial. Kambo. Integracion.', 'Suave, privado y profesional. Sin ruido.'],
    places: ['Mexico', 'Jamaica', 'Bali', 'India'],
    authors: ['Adizele Oazyse — autor de la metasincronica.', 'Abu — guia de la linea corporal y ritual.'],
    reviews: ['Preciso. Profundo. Sin teatro.', 'Despues del trabajo hubo silencio interior.', 'El cuerpo solto tension. La conciencia se aclaro.'],
    telegram: 'abrir Telegram',
  },
  fr: {
    mark: 'People X',
    label: 'retraites privees / metasynchronique / corps',
    line: 'Retraites premium pour un travail profond avec le subconscient, le corps et l’etat.',
    nav: { access: 'entree', about: 'essence', places: 'lieux', authors: 'auteurs', reviews: 'avis' },
    panelTitles: { access: 'entree privee', about: 'essence du projet', places: 'lieux', authors: 'auteurs', reviews: 'retours' },
    access: [`Code: ${ACCESS_CODE}`, 'Envoyez-le a @oazysebot pour recevoir les informations privees.'],
    about: ['Petits groupes. Preparation. Travail ceremoniel. Kambo. Integration.', 'Doux, prive et professionnel. Sans bruit.'],
    places: ['Mexique', 'Jamaique', 'Bali', 'Inde'],
    authors: ['Adizele Oazyse — auteur de la metasynchronique.', 'Abu — guide de la ligne corporelle et rituelle.'],
    reviews: ['Precis. Profond. Sans theatre.', 'Apres le travail, le silence est revenu dedans.', 'Le corps a relache la tension. La conscience est plus claire.'],
    telegram: 'ouvrir Telegram',
  },
  pt: {
    mark: 'Pessoas X',
    label: 'retiros privados / metassincronica / corpo',
    line: 'Retiros premium para trabalho profundo com subconsciente, corpo e estado interno.',
    nav: { access: 'entrada', about: 'essencia', places: 'locais', authors: 'autores', reviews: 'relatos' },
    panelTitles: { access: 'entrada privada', about: 'essencia do projeto', places: 'locais', authors: 'autores', reviews: 'feedback' },
    access: [`Codigo: ${ACCESS_CODE}`, 'Envie para @oazysebot para receber informacoes privadas.'],
    about: ['Pequenos grupos. Preparacao. Trabalho cerimonial. Kambo. Integracao.', 'Suave, privado e profissional. Sem ruido.'],
    places: ['Mexico', 'Jamaica', 'Bali', 'India'],
    authors: ['Adizele Oazyse — autor da metassincronica.', 'Abu — guia da linha corporal e ritual.'],
    reviews: ['Preciso. Profundo. Sem teatro.', 'Depois do trabalho ficou silencioso por dentro.', 'O corpo soltou tensao. A consciencia ficou mais clara.'],
    telegram: 'abrir Telegram',
  },
} satisfies Record<Lang, {
  mark: string;
  label: string;
  line: string;
  nav: Record<Panel, string>;
  panelTitles: Record<Panel, string>;
  access: string[];
  about: string[];
  places: string[];
  authors: string[];
  reviews: string[];
  telegram: string;
}>;

const panelOrder: Panel[] = ['access', 'about', 'places', 'authors', 'reviews'];

const PeopleXPage = () => {
  const [lang, setLang] = useState<Lang>('ru');
  const [panel, setPanel] = useState<Panel | null>(null);
  const t = copy[lang];
  const panelItems = panel ? t[panel] : [];

  return (
    <main className="people-x">
      <style>{`
        .people-x {
          min-height: 100vh;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0)),
            #010101;
          color: #d9d1bd;
          font-family: "Rajdhani", "Orbitron", "Eurostile", "Bank Gothic", "DIN Condensed", ui-monospace, monospace;
          letter-spacing: 0.02em;
          overflow: hidden;
        }

        .people-x * { box-sizing: border-box; }

        .px-root {
          min-height: 100vh;
          width: min(100% - 32px, 980px);
          margin: 0 auto;
          display: grid;
          grid-template-rows: auto 1fr auto;
          padding: 18px 0;
        }

        .px-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .px-lang,
        .px-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .px-mini,
        .px-lang button,
        .px-nav button,
        .px-panel-close {
          border: 1px solid rgba(202, 161, 72, 0.22);
          background: rgba(202, 161, 72, 0.035);
          color: rgba(217, 209, 189, 0.62);
          min-height: 28px;
          padding: 0 10px;
          font: inherit;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          cursor: pointer;
        }

        .px-lang button.active,
        .px-nav button:hover,
        .px-panel-close:hover {
          color: #e1b75e;
          border-color: rgba(225, 183, 94, 0.55);
        }

        .px-center {
          min-height: 0;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 24px 0;
        }

        .px-kicker {
          margin: 0 0 18px;
          color: rgba(217, 209, 189, 0.42);
          font-size: 10px;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }

        .px-mark {
          margin: 0;
          font-size: clamp(56px, 13vw, 140px);
          font-weight: 500;
          line-height: 0.82;
          letter-spacing: 0;
          text-transform: uppercase;
          background: linear-gradient(92deg, #6f5520 0%, #f1d07b 42%, #9f742c 70%, #fff0b0 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 18px rgba(225, 183, 94, 0.13));
        }

        .px-line {
          width: min(520px, 100%);
          margin: 24px auto 0;
          color: rgba(217, 209, 189, 0.64);
          font-size: clamp(12px, 1.8vw, 15px);
          line-height: 1.7;
        }

        .px-nav {
          justify-content: center;
          margin-top: 26px;
        }

        .px-bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: end;
          color: rgba(217, 209, 189, 0.32);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .px-code {
          color: #e1b75e;
        }

        .px-panel-backdrop {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: rgba(0, 0, 0, 0.78);
          display: grid;
          place-items: center;
          padding: 16px;
        }

        .px-panel {
          width: min(460px, 100%);
          border: 1px solid rgba(225, 183, 94, 0.26);
          background: #030303;
          padding: 18px;
        }

        .px-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .px-panel h2 {
          margin: 0;
          color: #e1b75e;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .px-list {
          display: grid;
          gap: 10px;
        }

        .px-item {
          margin: 0;
          border-top: 1px solid rgba(225, 183, 94, 0.12);
          padding-top: 10px;
          color: rgba(217, 209, 189, 0.68);
          font-size: 12px;
          line-height: 1.65;
        }

        .px-telegram {
          margin-top: 16px;
          display: inline-flex;
          min-height: 30px;
          align-items: center;
          border: 1px solid rgba(225, 183, 94, 0.3);
          padding: 0 12px;
          color: #e1b75e;
          text-decoration: none;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        @media (max-width: 640px) {
          .people-x { overflow: auto; }
          .px-root { min-height: 100svh; width: min(100% - 24px, 980px); }
          .px-top, .px-bottom { align-items: flex-start; flex-direction: column; }
          .px-center { place-items: start; text-align: left; }
          .px-line { margin-left: 0; }
          .px-nav { justify-content: flex-start; }
        }
      `}</style>

      <div className="px-root">
        <header className="px-top">
          <div className="px-mini">PX / CLOSED</div>
          <div className="px-lang" aria-label="Language">
            {languages.map((item) => (
              <button
                className={item.code === lang ? 'active' : undefined}
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <section className="px-center" aria-label={t.mark}>
          <div>
            <p className="px-kicker">{t.label}</p>
            <h1 className="px-mark">{t.mark}</h1>
            <p className="px-line">{t.line}</p>
            <nav className="px-nav" aria-label="Project details">
              {panelOrder.map((item) => (
                <button key={item} type="button" onClick={() => setPanel(item)}>
                  {t.nav[item]}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <footer className="px-bottom">
          <span>Mexico / Jamaica / Bali / India</span>
          <span className="px-code">{ACCESS_CODE}</span>
        </footer>
      </div>

      {panel && (
        <div className="px-panel-backdrop" role="dialog" aria-modal="true" aria-label={t.panelTitles[panel]}>
          <aside className="px-panel">
            <div className="px-panel-head">
              <h2>{t.panelTitles[panel]}</h2>
              <button className="px-panel-close" type="button" onClick={() => setPanel(null)} aria-label="Close">
                <X size={14} />
              </button>
            </div>
            <div className="px-list">
              {panelItems.map((item) => (
                <p className="px-item" key={item}>{item}</p>
              ))}
            </div>
            {(panel === 'access' || panel === 'authors') && (
              <a className="px-telegram" href={BOT_URL} target="_blank" rel="noreferrer">
                {t.telegram}
              </a>
            )}
          </aside>
        </div>
      )}
    </main>
  );
};

export default PeopleXPage;
