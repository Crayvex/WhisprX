
const Navbar = () => {
  return (
    <section id="Navbar" className="w-full fixed flex items-center my-2 justify-center" >
        <div className="w-[90%] h-[6%] flex items-center justify-between overflow-hidden bg-primary/70 backdrop-blur-2xl rounded-3xl px-6 md:py-2 py-1 text-primary-content">
            <a href="/" className="text-xl font-Poppins-Bold">WhisprX</a>
            <div className="flex gap-4 items-center text-sm">
                <a href="/signup" className="hover:text-primary-content/60">Signup</a>            </div>
        </div>
    </section>
  );
};

export default Navbar;
