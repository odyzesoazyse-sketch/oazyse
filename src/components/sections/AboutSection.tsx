import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

const AboutSection = () => {
  const { t } = useTranslation();
  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];
  const colors = ['neon-purple', 'neon-green', 'neon-purple', 'neon-green'];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neon-purple animate-neon-pulse-purple" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('about.subtitle')}</span>
        </div>
        <h1 className="title bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple bg-clip-text text-transparent animate-neon-text-pulse">
          {t('about.title')}
        </h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-purple via-neon-green to-transparent animate-neon-line-pulse" />

      <div className="space-y-6">
        {paragraphs.map((key, index) => (
          <p 
            key={key} 
            className={`body relative pl-4 border-l-2 border-${colors[index]} hover:bg-${colors[index]}/5 transition-all py-2`}
          >
            {t(key)}
          </p>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-8">
        <div className="text-center p-4 border border-neon-purple/30 rounded-lg hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.3)] transition-all">
          <div className="text-2xl font-light text-neon-purple animate-neon-text-pulse">92%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
            {t('language.select') === 'Язык' ? 'Рост уверенности' : 'Confidence Growth'}
          </div>
        </div>
        <div className="text-center p-4 border border-neon-green/30 rounded-lg hover:border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.3)] transition-all">
          <div className="text-2xl font-light text-neon-green animate-neon-text-pulse">1000+</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
            {t('language.select') === 'Язык' ? 'Участников' : 'Participants'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
