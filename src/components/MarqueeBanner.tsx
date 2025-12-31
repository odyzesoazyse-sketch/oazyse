const MarqueeBanner = () => {
  const text = "Индивидуальная сессия с основателем oazyse°  •  Глубокая операция на сознании  •  Распрограммирование фракталов  •  100% гарантия результата или деньги назад  •  Один сеанс навсегда меняет жизнь  •  Записаться сейчас →";
  
  return (
    <div className="fixed top-11 left-0 right-0 z-30 w-full bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple overflow-hidden py-1.5">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-xs font-medium text-white mx-4">{text}</span>
        <span className="text-xs font-medium text-white mx-4">{text}</span>
        <span className="text-xs font-medium text-white mx-4">{text}</span>
        <span className="text-xs font-medium text-white mx-4">{text}</span>
      </div>
    </div>
  );
};

export default MarqueeBanner;
