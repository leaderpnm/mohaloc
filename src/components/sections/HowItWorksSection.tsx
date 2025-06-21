import { Search, Phone, Car } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "../../hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const {
    ref: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation();
  const {
    ref: stepsRef,
    isVisible: stepsVisible
  } = useScrollAnimation();
  const {
    ref: statsRef,
    isVisible: statsVisible
  } = useScrollAnimation();
  const steps = [{
    icon: Search,
    title: t('howItWorks.step1Title'),
    description: t('howItWorks.step1Desc')
  }, {
    icon: Phone,
    title: t('howItWorks.step2Title'),
    description: t('howItWorks.step2Desc')
  }, {
    icon: Car,
    title: t('howItWorks.step3Title'),
    description: t('howItWorks.step3Desc')
  }];
  return <section id="how" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div ref={stepsRef}>
          {/* Desktop: Grid horizontal */}
          <div className={`hidden sm:grid sm:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 delay-200 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {steps.map((step, index) => <div key={index} className={`text-center relative transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: stepsVisible ? `${300 + index * 150}ms` : '0ms'
          }}>
                <div className="relative mb-6 sm:mb-8">
                  <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <step.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-6 sm:translate-x-8 bg-primary text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold z-20">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-4">{step.description}</p>
              </div>)}
          </div>

          {/* Mobile: Carousel */}
          <div className={`sm:hidden transition-all duration-700 delay-200 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Carousel className="w-full">
              <CarouselContent>
                {steps.map((step, index) => <CarouselItem key={index}>
                    <div className="text-center relative p-4">
                      <div className="relative mb-6">
                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                          <step.icon className="h-10 w-10 text-primary" />
                        </div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-8 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20">
                          {index + 1}
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-base">{step.description}</p>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>

        <div ref={statsRef} className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('howItWorks.readyTitle')}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
              {t('howItWorks.readySubtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
              <div className="bg-white rounded-lg px-3 py-3 sm:px-4 sm:py-2 shadow-sm">
                <span className="text-primary font-bold text-xl sm:text-2xl block">{t('howItWorks.stat1')}</span>
                <p className="text-gray-600 text-xs sm:text-sm">{t('howItWorks.stat1Label')}</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-3 sm:px-4 sm:py-2 shadow-sm">
                <span className="text-primary font-bold text-xl sm:text-2xl block">{t('howItWorks.stat2')}</span>
                <p className="text-gray-600 text-xs sm:text-sm">{t('howItWorks.stat2Label')}</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-3 sm:px-4 sm:py-2 shadow-sm">
                <span className="text-primary font-bold text-xl sm:text-2xl block">{t('howItWorks.stat3')}</span>
                <p className="text-gray-600 text-xs sm:text-sm">{t('howItWorks.stat3Label')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;