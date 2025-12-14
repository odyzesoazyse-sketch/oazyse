import { useTranslation } from 'react-i18next';
import { Leaf, Users, Brain, Sparkles, MessageCircle, Zap } from 'lucide-react';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations', 'metasync'];
const serviceIcons = [Leaf, Users, Brain, Sparkles, MessageCircle, Zap];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple">{t('services.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
          {t('services.title')}
        </h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-green via-neon-purple to-transparent animate-neon-line-pulse" />

      <div className="space-y-6">
        {serviceKeys.map((key, index) => {
          const Icon = serviceIcons[index];
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={key} 
              className={`p-4 border border-border rounded-lg hover:border-${isEven ? 'neon-purple' : 'neon-green'} hover:shadow-[0_0_20px_hsl(var(--${isEven ? 'neon-purple' : 'neon-green'})/0.2)] transition-all group cursor-default`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isEven ? 'from-neon-purple to-neon-green' : 'from-neon-green to-neon-purple'} flex items-center justify-center flex-shrink-0 group-hover:animate-neon-pulse-${isEven ? 'purple' : 'green'}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] uppercase tracking-[0.2em] ${isEven ? 'text-neon-purple' : 'text-neon-green'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={`text-sm font-medium group-hover:${isEven ? 'text-neon-purple' : 'text-neon-green'} transition-colors`}>
                    {t(`services.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 body text-muted-foreground">
                    {t(`services.items.${key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSection;
