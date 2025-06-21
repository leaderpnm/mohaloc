
import { Instagram } from "lucide-react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/hooks/useTranslation";
const Footer = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
    }
  };
  return <footer className="bg-[#121212] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <img src="https://image.noelshack.com/fichiers/2025/25/2/1750194878-mohade-white.png" alt="Moha Location" className="h-12 w-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-200" onClick={scrollToTop} />
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary transition-colors duration-200" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary transition-colors duration-200" aria-label="WhatsApp">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary transition-colors duration-200" aria-label="Snapchat">
                <svg className="h-5 w-5" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="white" strokeLinejoin="round" strokeWidth="12" d="M95.918 22.002c-11.963-.087-24.145 4.54-32.031 13.717-6.995 7.405-9.636 17.901-9.284 27.868-.03 5.119.032 10.237.05 15.355-4.901-1.217-9.873-4.624-15.063-2.937-4.422 1.313-6.267 7.088-3.596 10.791 2.876 3.761 7.346 5.907 11.08 8.71 1.837 1.5 4.313 2.571 5.68 4.499-.001 4.62-2.425 8.897-4.722 12.786-5.597 8.802-14.342 15.531-23.705 20.18-2.39 1.035-4.59 4.144-2.473 6.499 3.862 3.622 9.327 4.778 14.195 6.486 2.047.64 5.078 1.34 4.886 4.084.335 2.923 2.205 6.066 5.492 6.078 7.873.91 16.289.522 23.345 4.741 6.917 4.006 14.037 8.473 22.255 8.96 8.188.767 16.623-.888 23.642-5.255 5.23-2.884 10.328-6.477 16.456-7.061 5.155-1.206 10.702-.151 15.685-2.072 3.193-1.367 2.762-5.244 4.104-7.808 2.532-1.747 5.77-1.948 8.59-3.102 3.687-1.47 8.335-2.599 10.268-6.413 1.148-3.038-2.312-4.698-4.453-5.88-11.38-5.874-21.631-14.921-26.121-27.191-.496-1.936-2.279-4.834.084-6.255 4.953-4.176 11.413-6.575 15.514-11.715 3.103-3.884.941-10.55-4.141-11.322-4.928-.78-9.525 1.893-14.152 3.127-.404-8.53.502-17.232-.776-25.746-2.429-13.808-13.514-25.157-26.813-29.124-4.521-1.401-9.266-2.037-13.996-2Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("about")} className={`text-gray-300 hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t('nav.about')}</button></li>
              <li><button onClick={() => scrollToSection("vehicles")} className={`text-gray-300 hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t('nav.vehicles')}</button></li>
              <li><button onClick={() => scrollToSection("how")} className={`text-gray-300 hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t('nav.howItWorks')}</button></li>
              <li><button onClick={() => scrollToSection("faq")} className={`text-gray-300 hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t('nav.faq')}</button></li>
              <li><button onClick={() => scrollToSection("contact")} className={`text-gray-300 hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t('nav.contact')}</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.cookies')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.usage')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.insurance')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">{t('footer.reportProblem')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <LanguageToggle variant="footer" />
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
