import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      {/* Hero */}
      <div className="relative mb-16 animate-slide-up">
        <span className="yeezy-number absolute -top-4 -left-4 opacity-5 pointer-events-none">
          О
        </span>
        <div className="space-y-6">
          <span className="yeezy-label text-muted-foreground">{t('about.title')}</span>
          <h1 className="font-display text-huge tracking-tight max-w-4xl">
            {t('about.title')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="space-y-8">
          {paragraphs.slice(0, 2).map((key, index) => (
            <p 
              key={key}
              className="yeezy-body text-muted-foreground animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {t(key)}
            </p>
          ))}
        </div>
        
        <div className="space-y-8">
          {paragraphs.slice(2).map((key, index) => (
            <p 
              key={key}
              className="yeezy-body text-muted-foreground animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 150}ms` }}
            >
              {t(key)}
            </p>
          ))}
        </div>
      </div>

      <div className="yeezy-divider" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-0 border border-border animate-slide-up" style={{ animationDelay: '600ms' }}>
        <div className="p-8 md:p-12 border-r border-border text-center">
          <span className="font-display text-display block">15+</span>
          <span className="yeezy-label text-muted-foreground mt-2 block">ЛЕТ ПРАКТИКИ</span>
        </div>
        <div className="p-8 md:p-12 border-r border-border text-center">
          <span className="font-display text-display block">∞</span>
          <span className="yeezy-label text-muted-foreground mt-2 block">ВОЗМОЖНОСТЕЙ</span>
        </div>
        <div className="p-8 md:p-12 text-center">
          <span className="font-display text-display block">1</span>
          <span className="yeezy-label text-muted-foreground mt-2 block">ПУТЬ</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;