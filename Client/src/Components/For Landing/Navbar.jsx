const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] h-20 flex items-center px-8">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-2xl tracking-tighter text-white">
            WhisprX
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features">Features</a>
          <a href="#interface">Interface</a>
          <a href="#infrastructure">Infrastructure</a>

          <button className="bg-white text-black px-6 py-2 rounded-full">
            Launch Terminal
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;