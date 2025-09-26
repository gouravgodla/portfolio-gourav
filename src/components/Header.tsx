import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../../constants";
import { MenuIcon, XIcon } from "./Icons";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#achievements", label: "Achievements" },
    { href: "#education", label: "Education" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
    setIsMenuOpen(false); // Close menu on link click
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-sm shadow-lg shadow-slate-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4 md:px-12">
          <a
            href="#hero"
            onClick={handleNavLinkClick}
            className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {PERSONAL_INFO.name}
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <MenuIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <XIcon className="w-7 h-7" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-12 space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavLinkClick}
              className="text-3xl font-semibold text-slate-200 hover:text-cyan-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
