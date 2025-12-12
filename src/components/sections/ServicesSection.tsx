import { useTranslation } from 'react-i18next';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple">{t('services.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">{t('services.title')}</h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-green via-neon-purple to-transparent" />

      <div className="space-y-8">
        {serviceKeys.map((key, index) => (
          <div 
            key={key} 
            className="py-4 border-b border-border hover:border-neon-green transition-all group cursor-default"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple group-hover:text-neon-green transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-sm group-hover:text-neon-purple transition-colors">{t(`services.items.${key}.title`)}</h3>
            <p className="mt-2 body">{t(`services.items.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;