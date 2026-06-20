
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import userAuthStore from "../../Store/userStore";
import { useThemeStore } from "../../Store/useThemeStore";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const nextTheme = theme === "light" ? "dark" : "light";

  const userAuth = userAuthStore((state) => state.userAuth)

  useEffect(() => {
    const sectionIds = ["features", "technology", "contact"];

    const updateActiveSection = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeRect = homeSection.getBoundingClientRect();
        if (homeRect.bottom > 120) {
          setActiveSection("");
          return;
        }
      }

      let closestSection = "";
      let smallestDistance = Infinity;

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const distance = Math.abs(element.getBoundingClientRect().top - 120);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSection = sectionId;
        }
      });

      setActiveSection(closestSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const getNavLinkClasses = (sectionId) => {
    const isActive = activeSection === sectionId;
    return `transition-all ${isActive ? "text-base-content border-b-2 pb-2" : "text-base-content/70 hover:text-base-content hover:border-b-2 hover:pb-2"}`;
  };

  return (
    <nav
      id="Landing-Navbar"
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-base-200/40 bg-base-100/20 px-6 py-4 text-base-content backdrop-blur-2xl transition-colors duration-500"
    >
      <div className="flex items-center gap-3">
        <img src="/Image/WhisprX logo.png" alt="WhisprX logo" className="h-10 w-10 rounded-full object-cover" />
        <a href="/" className="text-lg font-semibold text-base-content">
          WhisprX
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm">
        <a href="#features" className={getNavLinkClasses("features")}>Features</a>
        <a href="#technology" className={getNavLinkClasses("technology")}>Technology</a>
        <a href="#contact" className={getNavLinkClasses("contact")}>Contact</a>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setTheme(nextTheme)}
          className="rounded-3xl border border-base-200/50 bg-base-200/60 px-4 py-2 text-sm text-base-content transition hover:bg-base-200 cursor-pointer"
          aria-label={`Switch to ${nextTheme} mode`}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        {
          userAuth
        }
        <a
          href="/signup"
          className="rounded-3xl bg-amber-500 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
