
import { Button } from "@/components/ui/button";
import { Car, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const scrollToVehicles = () => {
    const element = document.getElementById("vehicles");
    if (element) {
      const navHeight = 64; // hauteur de la navigation (h-16)
      const offset = 0; // réduction de la marge supplémentaire
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return (
    <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Content */}
          <div className={`animate-fade-in text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 sm:mb-6 leading-tight font-semibold ${isRTL ? 'text-right lg:text-right' : 'text-left lg:text-left'}`}>
              {t('hero.title')}
            </h1>
            <p className={`text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 ${isRTL ? 'text-right lg:text-right' : 'text-left lg:text-left'}`}>
              {t('hero.subtitle')}
            </p>
            
            {/* Features */}
            <div className={`flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8 ${isRTL ? 'justify-end lg:justify-end' : 'justify-start lg:justify-start'}`}>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-sm sm:text-base text-gray-700">{t('hero.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-sm sm:text-base text-gray-700">{t('hero.available24h')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-sm sm:text-base text-gray-700">{t('hero.verifiedVehicles')}</span>
              </div>
            </div>

            <Button onClick={scrollToVehicles} className="bg-primary hover:bg-primary-dark text-white w-full sm:w-auto px-3 py-2 text-sm font-medium h-10">
              {t('hero.cta')}
            </Button>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-in-right order-first lg:order-last">
            <div className="relative">
              <img alt="Voiture moderne" className="rounded-2xl shadow-2xl w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-none object-cover" src="https://images.unsplash.com/photo-1597553245895-f38699ff6691?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] shadow-green-500/60"></div>
                  <span className="text-xs sm:text-sm font-medium text-white">{t('hero.algierOnly')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
