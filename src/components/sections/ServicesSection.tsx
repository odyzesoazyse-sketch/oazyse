const ServicesSection = () => {
  const services = [
    {
      title: 'ЧАЙНЫЕ ЦЕРЕМОНИИ',
      description: 'Традиционные чайные церемонии как практика осознанности и медитации. Погружение в состояние присутствия через ритуал чаепития.',
    },
    {
      title: 'САТСАНГИ',
      description: 'Встречи в формате сатсанг — пространство для обмена опытом, вопросов и ответов о природе реальности и сознания.',
    },
    {
      title: 'ГИПНОТЕРАПИЯ',
      description: 'Индивидуальные сессии гипнотерапии для работы с подсознанием, трансформации убеждений и исцеления эмоциональных травм.',
    },
    {
      title: 'МЕДИТАТИВНЫЕ ПРАКТИКИ',
      description: 'Групповые и индивидуальные медитации различных традиций для развития осознанности и внутреннего покоя.',
    },
    {
      title: 'КОНСУЛЬТАЦИИ',
      description: 'Персональные консультации по вопросам духовного развития, работы с сознанием и жизненных трансформаций.',
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="font-bold uppercase text-base md:text-lg">УСЛУГИ</h2>
      {services.map((service, index) => (
        <div key={index} className="space-y-2">
          <h3 className="font-bold uppercase text-sm md:text-base">{service.title}</h3>
          <p className="text-sm md:text-base leading-relaxed">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
