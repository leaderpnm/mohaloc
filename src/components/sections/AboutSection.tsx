import { Users, Shield, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "../../hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const AboutSection = () => {
  const { t } = useTranslation();
  
  const {
    ref: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation();
  const {
    ref: imageRef,
    isVisible: imageVisible
  } = useScrollAnimation();
  const {
    ref: contentRef,
    isVisible: contentVisible
  } = useScrollAnimation();
  
  const features = [{
    icon: Users,
    title: t('about.community'),
    description: t('about.communityDesc')
  }, {
    icon: Shield,
    title: t('about.security'),
    description: t('about.securityDesc')
  }, {
    icon: Award,
    title: t('about.excellence'),
    description: t('about.excellenceDesc')
  }];
  
  return <section id="about" className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('about.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div ref={imageRef} className={`transition-all duration-700 delay-200 order-2 lg:order-1 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 lg:-translate-x-8'}`}>
            <img alt="Équipe Moha Location" className="rounded-2xl shadow-xl w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-none object-cover" src="https://images.unsplash.com/photo-1595412839900-f85e3a59928e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
          
          <div ref={contentRef} className={`transition-all duration-700 delay-300 order-1 lg:order-2 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 lg:translate-x-8'}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
              {t('about.ourMission')}
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base text-center lg:text-left px-4 lg:px-0">
              {t('about.missionText')}
            </p>

            {/* Desktop: Grid horizontal */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-6">
              {features.map((feature, index) => {
              const Icon = feature.icon;
              return <div key={index} className="text-center">
                    <div className="bg-primary/10 p-3 rounded-lg mx-auto mb-3 w-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{feature.description}</p>
                  </div>;
            })}
            </div>

            {/* Mobile: Carousel */}
            <div className="sm:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return <CarouselItem key={index}>
                        <div className="text-center p-4">
                          <div className="bg-primary/10 p-3 rounded-lg mx-auto mb-4 w-fit">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </CarouselItem>;
                })}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;