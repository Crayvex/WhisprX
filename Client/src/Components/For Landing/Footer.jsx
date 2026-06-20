const Footer = () => {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95 px-6 py-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/Image/WhisprX logo.png" alt="WhisprX logo" className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-xl font-semibold text-white">WhisprX</p>
              <p className="text-sm text-slate-400">Secure chat for fast, private teams.</p>
            </div>
          </div>
          <p className="max-w-md leading-7 text-slate-400">
            WhisprX brings encrypted messaging, easy workspace control, and instant communication into one polished experience.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-amber-400">Quick links</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <a href="#home" className="transition hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#technology" className="transition hover:text-white">
                Technology
              </a>
            </li>
            <li>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/signup" className="transition hover:text-white">
                Sign up
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-amber-400">Contact</h3>
          <p className="text-sm text-slate-400">support@whisprx.com</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            For support, security inquiries, or partnership questions, contact the WhisprX team.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-amber-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-amber-400 hover:text-white">
              Terms
            </a>
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-amber-400 hover:text-white">
              Docs
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-800/70 pt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} WhisprX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
