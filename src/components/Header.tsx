const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 py-6 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-lg md:text-2xl leading-tight">
          <span className="font-bold uppercase">Институт Сознания Космического Разума</span>
          {" представляет "}
          <span className="font-bold">Oazyse</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
