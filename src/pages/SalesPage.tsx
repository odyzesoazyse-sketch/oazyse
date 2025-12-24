import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  Heart, 
  Users, 
  Trophy, 
  Building2, 
  Brain, 
  Zap, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Star,
  Gem,
  Palette,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Globe,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesPage = () => {
  const { t } = useTranslation();

  const examples = [
    { icon: Heart, key: 'family' },
    { icon: Trophy, key: 'athletes' },
    { icon: Building2, key: 'company' },
    { icon: Sparkles, key: 'spiritual' }
  ];

  const expandedExamples = [
    { icon: Target, key: 'personal' },
    { icon: Users, key: 'relationships' },
    { icon: Heart, key: 'parenting' },
    { icon: Trophy, key: 'sports' },
    { icon: GraduationCap, key: 'education' },
    { icon: Briefcase, key: 'business' },
    { icon: Palette, key: 'creativity' },
    { icon: Stethoscope, key: 'health' },
    { icon: Globe, key: 'social' },
    { icon: BookOpen, key: 'spirituality' }
  ];

  const guarantees = [
    t('sales.guarantees.item1'),
    t('sales.guarantees.item2'),
    t('sales.guarantees.item3'),
    t('sales.guarantees.item4'),
    t('sales.guarantees.item5')
  ];

  const metahumanPoints = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-neon-pulse-purple" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-neon-pulse-green" />
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
            <Gem className="w-4 h-4 text-primary animate-neon-pulse-purple" />
            <span className="text-sm text-primary">{t('sales.badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-neon-text-pulse">
              {t('sales.hero.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-6">
            {t('sales.hero.subtitle')}
          </p>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
            {t('sales.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/quiz">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg">
                {t('sales.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">{t('sales.hero.guarantee')}</p>
          </div>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-neon-line-pulse" />
        </div>
      </section>

      {/* Metasync Concept */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('sales.metasync.title')}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('sales.metasync.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary animate-neon-pulse-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">{t('sales.metasync.metasync.title')}</h3>
                <p className="text-muted-foreground">{t('sales.metasync.metasync.description')}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-accent animate-neon-pulse-green" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-accent">{t('sales.metasync.metasyncer.title')}</h3>
                <p className="text-muted-foreground">{t('sales.metasync.metasyncer.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Metahuman */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('sales.metahuman.title')}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('sales.metahuman.description')}
              </p>
              <ul className="space-y-4">
                {metahumanPoints.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(`sales.metahuman.point${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl" />
              <Card className="relative bg-card/80 backdrop-blur-sm border-primary/30">
                <CardContent className="p-8">
                  <Lightbulb className="w-16 h-16 text-primary mx-auto mb-6 animate-neon-pulse-purple" />
                  <h3 className="text-2xl font-bold text-center mb-4">{t('sales.metahuman.card.title')}</h3>
                  <p className="text-muted-foreground text-center">{t('sales.metahuman.card.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cook Analogy */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.analogy.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            {t('sales.analogy.description')}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 border-muted hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('sales.analogy.everyone.title')}</h3>
                <p className="text-muted-foreground">{t('sales.analogy.everyone.description')}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-muted hover:border-accent/50 transition-colors">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('sales.analogy.master.title')}</h3>
                <p className="text-muted-foreground">{t('sales.analogy.master.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Basic Examples */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.examples.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {t('sales.examples.subtitle')}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examples.map((example, index) => (
              <Card key={index} className="bg-card/50 border-muted hover:border-primary/50 transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <example.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{t(`sales.examples.${example.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`sales.examples.${example.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Examples */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.expanded.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
            {t('sales.expanded.subtitle')}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {expandedExamples.map((example, index) => (
              <Card key={index} className="bg-card/30 border-muted/50 hover:border-primary/50 transition-all hover:bg-card/50">
                <CardContent className="p-5">
                  <example.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-base font-bold mb-2">{t(`sales.expanded.${example.key}.title`)}</h3>
                  <p className="text-xs text-muted-foreground">{t(`sales.expanded.${example.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Computer Analogy */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Zap className="w-16 h-16 text-accent mx-auto mb-8 animate-neon-pulse-green" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.computer.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {t('sales.computer.description')}
          </p>
        </div>
      </section>

      {/* Discovery */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('sales.discovery.title')}
              </span>
            </h2>
            <Card className="bg-card/50 border-primary/30">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">{t('sales.discovery.description')}</p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-foreground mb-4">
                  {t('sales.discovery.quote')}
                </blockquote>
                <p className="text-muted-foreground">{t('sales.discovery.example')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Shield className="w-16 h-16 text-accent mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.safety.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('sales.safety.description')}
          </p>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t('sales.safety.details')}
          </p>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('sales.history.title')}
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground text-center mb-8">
              {t('sales.history.description')}
            </p>
            <p className="text-lg text-foreground/80 text-center">
              {t('sales.history.question')}
            </p>
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('sales.prediction.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {t('sales.prediction.description')}
            </p>
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
              <CardContent className="p-8">
                <p className="text-lg text-foreground italic">
                  "{t('sales.prediction.quote')}"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('sales.guarantee.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">{t('sales.guarantee.description')}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-3 bg-card/50 p-4 rounded-lg border border-primary/20">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{guarantee}</span>
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t('sales.guarantee.offer.title')}</h3>
                <p className="text-lg text-muted-foreground mb-6">{t('sales.guarantee.offer.description')}</p>
                <Link to="/quiz">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-12 py-6 text-lg">
                    {t('sales.guarantee.offer.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-neon-text-pulse">
              {t('sales.finalCta.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t('sales.finalCta.description')}
          </p>
          <Link to="/quiz">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-12 py-8 text-xl">
              {t('sales.finalCta.cta')}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <p className="mt-6 text-muted-foreground">{t('sales.finalCta.note')}</p>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;
