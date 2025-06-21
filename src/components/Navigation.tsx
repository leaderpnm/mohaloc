
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // hauteur de la navigation (h-16)
      const offset = 0; // réduction de la marge supplémentaire
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t('nav.about'), id: "about" },
    { label: t('nav.vehicles'), id: "vehicles" },
    { label: t('nav.howItWorks'), id: "how" },
    { label: t('nav.reviews'), id: "reviews" },
    { label: t('nav.faq'), id: "faq" },
    { label: t('nav.contact'), id: "contact" },
  ];

  // Fond blanc pur sur tous les appareils
  const mainNavClass = "bg-[#FFFFFF] shadow-lg";

  // Menu mobile avec fond blanc pur
  const mobileMenuClass = "bg-[#FFFFFF] shadow-lg";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mainNavClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://image.noelshack.com/fichiers/2025/25/2/1750194009-mohade.png"
              alt="Moha Location"
              className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={scrollToTop}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`flex items-center gap-6 ${isRTL ? 'mr-10' : 'ml-10'}`}>
              <div className={`flex items-baseline ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-gray-700 hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#006533] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span 
                  className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ease-in-out absolute ${
                    isMobileMenuOpen 
                      ? 'rotate-45' 
                      : 'rotate-0 -translate-y-1'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ease-in-out absolute ${
                    isMobileMenuOpen 
                      ? '-rotate-45' 
                      : 'rotate-0 translate-y-1'
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className={`w-full py-4 transition-all duration-300 ${mobileMenuClass}`}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-gray-700 hover:text-primary block px-6 py-3 text-base font-medium w-full ${isRTL ? 'text-right' : 'text-left'} transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {item.label}
            </button>
          ))}
          <div className={`px-6 py-3 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-4 opacity-0'
          }`}
          style={{
            transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms'
          }}>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
