import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "../../hooks/useTranslation";

const ReviewsSection = () => {
  const { t } = useTranslation();
  const {
    ref: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation();
  const {
    ref: cardsRef,
    isVisible: cardsVisible
  } = useScrollAnimation();
  const {
    ref: statsRef,
    isVisible: statsVisible
  } = useScrollAnimation();
  const reviews = [{
    name: "Ahmed Benali",
    location: "Alger",
    rating: 5,
    comment: t('reviews.testimonial1'),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }, {
    name: "Fatima Messaoudi",
    location: "Oran",
    rating: 5,
    comment: t('reviews.testimonial2'),
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }, {
    name: "Karim Hadj",
    location: "Constantine",
    rating: 5,
    comment: t('reviews.testimonial3'),
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }];
  return <section id="reviews" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('reviews.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => <Card key={index} className={`bg-white card-hover h-full flex flex-col ${cardsVisible ? `card-enter card-enter-delay-${index + 1}` : 'opacity-0 translate-y-8'}`}>
              <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" style={{ color: '#D20F33' }} />)}
                </div>
                
                <p className="text-gray-600 mb-4 sm:mb-6 italic leading-relaxed flex-grow text-sm sm:text-base">
                  "{review.comment}"
                </p>
                
                <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg sm:text-xl text-gray-900 font-semibold">{review.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Alger</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div ref={statsRef} className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 font-semibold">
              {t('reviews.satisfaction')}
            </h3>
            <p className="text-primary-foreground/90 mb-4 sm:mb-6 text-sm sm:text-base px-4">
              {t('reviews.recommendationText')}
            </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">4.9/5</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">{t('reviews.averageRating')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">95%</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">{t('reviews.recommendation')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">24h</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">{t('reviews.customerSupport')}</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ReviewsSection;