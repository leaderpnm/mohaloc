import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "../../hooks/useTranslation";

const FAQSection = () => {
  const { t } = useTranslation();
  
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
  
  const faqs = [{
    question: t('faq.q1'),
    answer: t('faq.a1')
  }, {
    question: t('faq.q2'),
    answer: t('faq.a2')
  }, {
    question: t('faq.q3'),
    answer: t('faq.a3')
  }, {
    question: t('faq.q4'),
    answer: t('faq.a4')
  }, {
    question: t('faq.q5'),
    answer: t('faq.a5')
  }, {
    question: t('faq.q6'),
    answer: t('faq.a6')
  }, {
    question: t('faq.q7'),
    answer: t('faq.a7')
  }];
  
  return <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('faq.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="animate-fade-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t('faq.moreQuestions')}</p>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-primary hover:text-primary-dark font-semibold underline transition-colors duration-200 cursor-pointer"
          >
            {t('faq.contactUs')}
          </button>
        </div>
      </div>
    </section>;
};
export default FAQSection;