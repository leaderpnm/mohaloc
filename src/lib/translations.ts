export type TranslationKey = 
  | 'nav.about'
  | 'nav.vehicles' 
  | 'nav.howItWorks'
  | 'nav.reviews'
  | 'nav.faq'
  | 'nav.contact'
  | 'footer.quickLinks'
  | 'footer.support'
  | 'footer.copyright'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'hero.secure'
  | 'hero.available24h'
  | 'hero.verifiedVehicles'
  | 'hero.algierOnly'
  | 'about.title'
  | 'about.subtitle'
  | 'about.whyChooseUs'
  | 'about.transparentPricing'
  | 'about.transparentPricingDesc'
  | 'about.24hSupport'
  | 'about.24hSupportDesc'
  | 'about.verifiedVehicles'
  | 'about.verifiedVehiclesDesc'
  | 'about.easyBooking'
  | 'about.easyBookingDesc'
  | 'vehicles.title'
  | 'vehicles.subtitle'
  | 'vehicles.noVehicles'
  | 'vehicles.dataFound'
  | 'vehicles.reserve'
  | 'vehicles.perDay'
  | 'vehicles.showMore'
  | 'vehicles.showLess'
  | 'vehicles.seats'
  | 'vehicles.manual'
  | 'vehicles.automatic'
  | 'vehicles.availableCount'
  | 'vehicles.displayedCount'
  | 'vehicles.loading'
  | 'vehicles.retry'
  | 'vehicles.error'
  | 'howItWorks.title'
  | 'howItWorks.subtitle'
  | 'howItWorks.step1Title'
  | 'howItWorks.step1Desc'
  | 'howItWorks.step2Title'
  | 'howItWorks.step2Desc'
  | 'howItWorks.step3Title'
  | 'howItWorks.step3Desc'
  | 'howItWorks.readyTitle'
  | 'howItWorks.readySubtitle'
  | 'howItWorks.stat1'
  | 'howItWorks.stat1Label'
  | 'howItWorks.stat2'
  | 'howItWorks.stat2Label'
  | 'howItWorks.stat3'
  | 'howItWorks.stat3Label'
  | 'reviews.title'
  | 'reviews.subtitle'
  | 'faq.title'
  | 'faq.subtitle'
  | 'faq.q1'
  | 'faq.a1'
  | 'faq.q2'
  | 'faq.a2'
  | 'faq.q3'
  | 'faq.a3'
  | 'faq.q4'
  | 'faq.a4'
  | 'faq.q5'
  | 'faq.a5'
  | 'faq.q6'
  | 'faq.a6'
  | 'faq.q7'
  | 'faq.a7'
  | 'faq.moreQuestions'
  | 'faq.contactUs'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.firstName'
  | 'contact.lastName'
  | 'contact.email'
  | 'contact.message'
  | 'contact.messagePlaceholder'
  | 'contact.sendMessage'
  | 'contact.phone'
  | 'contact.address'
  | 'contact.addressText'
  | 'contact.hours'
  | 'contact.hoursText'
  | 'contact.urgentHelp'
  | 'contact.urgentHelpText'
  | 'contact.emergencyAssistance'
  | 'footer.description'
  | 'footer.helpCenter'
  | 'footer.terms'
  | 'footer.privacy'
  | 'footer.cookies'
  | 'footer.usage'
  | 'footer.insurance'
  | 'footer.reportProblem'
  | 'contact.ourContact'
  | 'contact.sendMessage2'
  | 'contact.available24h'
  | 'contact.responseIn24h'
  | 'reviews.satisfaction'
  | 'reviews.recommendationText'
  | 'reviews.averageRating'
  | 'reviews.recommendation'
  | 'reviews.customerSupport'
  | 'reviews.testimonial1'
  | 'reviews.testimonial2'
  | 'reviews.testimonial3'
  | 'about.ourMission'
  | 'about.missionText'
  | 'about.excellence'
  | 'about.excellenceDesc'
  | 'about.security'
  | 'about.securityDesc'
  | 'about.community'
  | 'about.communityDesc'
  | 'contact.contactDescription';

export const translations = {
  fr: {
    'nav.about': 'À propos',
    'nav.vehicles': 'Véhicules',
    'nav.howItWorks': 'Comment ça marche ?',
    'nav.reviews': 'Avis',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'footer.quickLinks': 'Liens rapides',
    'footer.support': 'Support',
    'footer.copyright': '© 2025 Moha Location. Tous droits réservés.',
    'hero.title': 'Louez votre voiture en toute simplicité à Alger',
    'hero.subtitle': 'Des véhicules fiables, des prix transparents et une réservation simple par téléphone.',
    'hero.cta': 'Réservez maintenant',
    'hero.secure': 'Sécurisé',
    'hero.available24h': 'Disponible 24h/24',
    'hero.verifiedVehicles': 'Véhicules vérifiés',
    'hero.algierOnly': 'Alger uniquement',
    'about.title': 'À propos de Moha Location',
    'about.subtitle': 'Votre partenaire de confiance pour la location de véhicules à Alger',
    'about.whyChooseUs': 'Pourquoi nous choisir ?',
    'about.transparentPricing': 'Prix transparents',
    'about.transparentPricingDesc': 'Aucun frais caché, des tarifs clairs et compétitifs pour tous nos véhicules.',
    'about.24hSupport': 'Support 24h/24',
    'about.24hSupportDesc': 'Notre équipe est disponible à tout moment pour vous accompagner.',
    'about.verifiedVehicles': 'Véhicules vérifiés',
    'about.verifiedVehiclesDesc': 'Tous nos véhicules sont contrôlés et entretenus régulièrement.',
    'about.easyBooking': 'Réservation facile',
    'about.easyBookingDesc': 'Réservez par téléphone en quelques minutes, simple et rapide.',
    'vehicles.title': 'Nos Véhicules',
    'vehicles.subtitle': 'Découvrez notre sélection de véhicules soigneusement vérifiés et entretenus.',
    'vehicles.noVehicles': 'Aucun véhicule disponible pour le moment.',
    'vehicles.dataFound': 'Données trouvées:',
    'vehicles.reserve': 'Appeler pour réserver',
    'vehicles.perDay': '/jour',
    'vehicles.showMore': 'Voir tous les véhicules',
    'vehicles.showLess': 'Voir moins de véhicules',
    'vehicles.seats': 'places',
    'vehicles.manual': 'Manuelle',
    'vehicles.automatic': 'Automatique',
    'vehicles.availableCount': 'véhicules disponibles',
    'vehicles.displayedCount': 'véhicules sur',
    'vehicles.loading': 'Chargement des véhicules...',
    'vehicles.retry': 'Réessayer',
    'vehicles.error': 'Erreur',
    'howItWorks.title': 'Comment ça marche ?',
    'howItWorks.subtitle': 'Louez votre véhicule en toute simplicité en 3 étapes',
    'howItWorks.step1Title': 'Cherchez et sélectionnez',
    'howItWorks.step1Desc': 'Parcourez notre sélection de véhicules et choisissez celui qui correspond à vos besoins.',
    'howItWorks.step2Title': 'Appelez pour réserver',
    'howItWorks.step2Desc': 'Appelez-nous directement pour réserver vos dates et finaliser votre location par téléphone ou SMS.',
    'howItWorks.step3Title': 'Récupérez et partez',
    'howItWorks.step3Desc': 'Récupérez votre véhicule au point de rendez-vous convenu et profitez de votre voyage en toute tranquillité.',
    'howItWorks.readyTitle': 'Prêt à commencer votre voyage ?',
    'howItWorks.readySubtitle': 'Rejoignez des milliers d\'Algérois qui nous font déjà confiance pour leurs déplacements.',
    'howItWorks.stat1': '20+',
    'howItWorks.stat1Label': 'Véhicules disponibles',
    'howItWorks.stat2': '150+',
    'howItWorks.stat2Label': 'Clients satisfaits',
    'howItWorks.stat3': '2h max.',
    'howItWorks.stat3Label': 'Temps de réponse',
    'reviews.title': 'Avis clients',
    'reviews.subtitle': 'Ce que disent nos clients de notre service',
    'faq.title': 'Questions fréquentes',
    'faq.subtitle': 'Trouvez rapidement les réponses à vos questions les plus courantes.',
    'faq.q1': 'Comment puis-je réserver un véhicule ?',
    'faq.a1': 'La réservation est très simple ! Consultez nos véhicules disponibles sur le site, puis appelez-nous directement au +213 123 456 789 pour finaliser votre réservation par téléphone ou SMS. Nous confirmerons tous les détails avec vous.',
    'faq.q2': 'Quels documents dois-je fournir ?',
    'faq.a2': 'Vous devez fournir une pièce d\'identité valide (carte nationale ou passeport), un permis de conduire valide et une preuve de domicile récente. Pour certains véhicules, un dépôt de garantie peut être demandé.',
    'faq.q3': 'Où puis-je récupérer le véhicule ?',
    'faq.a3': 'Nous proposons plusieurs points de récupération à travers Alger. Lors de la réservation par téléphone, vous pourrez choisir le point le plus proche de chez vous. Nous proposons aussi la livraison à domicile dans certaines zones d\'Alger.',
    'faq.q4': 'Que faire en cas de problème avec le véhicule ?',
    'faq.a4': 'Notre service client est disponible 24h/24. En cas de panne ou de problème, contactez-nous immédiatement au numéro d\'urgence fourni avec votre réservation. Nous nous chargerons de résoudre le problème rapidement.',
    'faq.q5': 'Les véhicules sont-ils assurés ?',
    'faq.a5': 'Oui, tous nos véhicules sont couverts par une assurance complète. Cette assurance couvre les dommages au véhicule et la responsabilité civile. Des options d\'assurance supplémentaires sont disponibles lors de la réservation.',
    'faq.q6': 'Puis-je annuler ma réservation ?',
    'faq.a6': 'Oui, vous pouvez annuler votre réservation en nous appelant jusqu\'à 24h avant le début de la location sans frais. Pour les annulations de dernière minute, des frais peuvent s\'appliquer selon nos conditions générales.',
    'faq.q7': 'Comment puis-je payer ma réservation ?',
    'faq.a7': 'Le paiement s\'effectue en espèces lors de la récupération du véhicule. Cela simplifie le processus et évite les complications liées aux cartes bancaires. Nous acceptons les dinars algériens uniquement.',
    'faq.moreQuestions': 'Vous ne trouvez pas la réponse à votre question ?',
    'faq.contactUs': 'Contactez-nous directement',
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Une question ? Un besoin particulier ? N\'hésitez pas à nous écrire.',
    'contact.firstName': 'Prénom',
    'contact.lastName': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Décrivez votre demande ou votre question...',
    'contact.sendMessage': 'Envoyer le message',
    'contact.phone': 'Téléphone',
    'contact.address': 'Adresse',
    'contact.addressText': '123 Rue de la Liberté\n16000 Alger, Algérie',
    'contact.hours': 'Horaires',
    'contact.hoursText': 'Lundi - Vendredi : 8h - 18h\nSamedi - Dimanche : 9h - 16h',
    'contact.urgentHelp': 'Besoin d\'aide urgente ?',
    'contact.urgentHelpText': 'Notre service d\'assistance d\'urgence est disponible 24h/24 pour tous nos clients.',
    'contact.emergencyAssistance': 'Assistance d\'urgence',
    'footer.description': 'Moha Location, votre partenaire de confiance pour la location de véhicules entre particuliers à Alger. Simplicité, sécurité et transparence.',
    'footer.helpCenter': 'Centre d\'aide',
    'footer.terms': 'Conditions générales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.cookies': 'Cookies',
    'footer.usage': 'Conditions d\'utilisation',
    'footer.insurance': 'Assurance',
    'footer.reportProblem': 'Signaler un problème',
    'contact.ourContact': 'Nos coordonnées',
    'contact.sendMessage2': 'Envoyez-nous un message',
    'contact.available24h': 'Disponible 24h/24',
    'contact.responseIn24h': 'Réponse sous 24h',
    'reviews.satisfaction': 'Votre satisfaction, notre priorité',
    'reviews.recommendationText': 'Plus de 95% de nos clients nous recommandent à leurs proches.',
    'reviews.averageRating': 'Note moyenne',
    'reviews.recommendation': 'Recommandation',
    'reviews.customerSupport': 'Support client',
    'reviews.testimonial1': 'Service excellent ! La voiture était impeccable et la réservation très simple. Je recommande vivement Moha Location.',
    'reviews.testimonial2': 'Très satisfaite de mon expérience. L\'équipe est professionnelle et les prix sont très compétitifs.',
    'reviews.testimonial3': 'Première expérience et certainement pas la dernière ! Processus fluide du début à la fin.',
    'about.ourMission': 'Notre mission',
    'about.missionText': 'Faciliter l\'accès à la mobilité à Alger grâce à une plateforme sécurisée, simple et transparente. Nous croyons que chacun devrait pouvoir accéder facilement à un véhicule fiable quand il en a besoin.',
    'about.excellence': 'Excellence',
    'about.excellenceDesc': 'Service client de qualité et support 24h/24',
    'about.security': 'Sécurité',
    'about.securityDesc': 'Véhicules vérifiés et assurance complète',
    'about.community': 'Communauté',
    'about.communityDesc': 'Une communauté de confiance entre particuliers',
    'contact.contactDescription': 'N\'hésitez pas à nous contacter par téléphone, email ou en personne. Notre équipe est disponible pour vous aider.'
  },
  ar: {
    'nav.about': 'حول',
    'nav.vehicles': 'المركبات',
    'nav.howItWorks': 'كيف يعمل؟',
    'nav.reviews': 'التقييمات',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.contact': 'اتصل بنا',
    'footer.quickLinks': 'روابط سريعة',
    'footer.support': 'الدعم',
    'footer.copyright': '© 2025 موحا لوكيشن. جميع الحقوق محفوظة.',
    'hero.title': 'استأجر سيارتك بكل سهولة في الجزائر العاصمة',
    'hero.subtitle': 'مركبات موثوقة، أسعار شفافة وحجز بسيط عبر الهاتف.',
    'hero.cta': 'احجز الآن',
    'hero.secure': 'آمن',
    'hero.available24h': 'متاح 24/7',
    'hero.verifiedVehicles': 'مركبات موثقة',
    'hero.algierOnly': 'الجزائر العاصمة فقط',
    'about.title': 'حول موحا لوكيشن',
    'about.subtitle': 'شريكك الموثوق لتأجير المركبات في الجزائر العاصمة',
    'about.whyChooseUs': 'لماذا تختارنا؟',
    'about.transparentPricing': 'أسعار شفافة',
    'about.transparentPricingDesc': 'لا توجد رسوم خفية، أسعار واضحة وتنافسية لجميع مركباتنا.',
    'about.24hSupport': 'دعم 24/7',
    'about.24hSupportDesc': 'فريقنا متاح في أي وقت لمساعدتك.',
    'about.verifiedVehicles': 'مركبات موثقة',
    'about.verifiedVehiclesDesc': 'جميع مركباتنا يتم فحصها وصيانتها بانتظام.',
    'about.easyBooking': 'حجز سهل',
    'about.easyBookingDesc': 'احجز عبر الهاتف في دقائق قليلة، بسيط وسريع.',
    'vehicles.title': 'مركباتنا',
    'vehicles.subtitle': 'اكتشف مجموعة مركباتنا المفحوصة والمُصانة بعناية.',
    'vehicles.noVehicles': 'لا توجد مركبات متاحة في الوقت الحالي.',
    'vehicles.dataFound': 'البيانات الموجودة:',
    'vehicles.reserve': 'اتصل للحجز',
    'vehicles.perDay': '/يوم',
    'vehicles.showMore': 'عرض جميع المركبات',
    'vehicles.showLess': 'عرض أقل من المركبات',
    'vehicles.seats': 'مقاعد',
    'vehicles.manual': 'يدوي',
    'vehicles.automatic': 'أوتوماتيكي',
    'vehicles.availableCount': 'مركبة متاحة',
    'vehicles.displayedCount': 'مركبة من',
    'vehicles.loading': 'جارٍ تحميل المركبات...',
    'vehicles.retry': 'إعادة المحاولة',
    'vehicles.error': 'خطأ',
    'howItWorks.title': 'كيف يعمل؟',
    'howItWorks.subtitle': 'استأجر مركبتك بكل سهولة في 3 خطوات',
    'howItWorks.step1Title': 'ابحث واختر',
    'howItWorks.step1Desc': 'تصفح مجموعة مركباتنا واختر ما يناسب احتياجاتك.',
    'howItWorks.step2Title': 'اتصل للحجز',
    'howItWorks.step2Desc': 'اتصل بنا مباشرة لحجز تواريخك وإنهاء تأجيرك عبر الهاتف أو الرسائل النصية.',
    'howItWorks.step3Title': 'استلم وانطلق',
    'howItWorks.step3Desc': 'استلم مركبتك في نقطة الالتقاء المتفق عليها واستمتع برحلتك براحة تامة.',
    'howItWorks.readyTitle': 'جاهز لبدء رحلتك؟',
    'howItWorks.readySubtitle': 'انضم لآلاف سكان الجزائر العاصمة الذين يثقون بنا لتنقلاتهم.',
    'howItWorks.stat1': '20+',
    'howItWorks.stat1Label': 'مركبة متاحة',
    'howItWorks.stat2': '150+',
    'howItWorks.stat2Label': 'عميل راضي',
    'howItWorks.stat3': '2 ساعة كحد أقصى',
    'howItWorks.stat3Label': 'وقت الاستجابة',
    'reviews.title': 'آراء العملاء',
    'reviews.subtitle': 'ماذا يقول عملاؤنا عن خدمتنا',
    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'اعثر بسرعة على إجابات لأسئلتك الأكثر شيوعاً.',
    'faq.q1': 'كيف يمكنني حجز مركبة؟',
    'faq.a1': 'الحجز بسيط جداً! اطلع على المركبات المتاحة في الموقع، ثم اتصل بنا مباشرة على الرقم +213 123 456 789 لإنهاء حجزك عبر الهاتف أو الرسائل النصية. سنؤكد معك جميع التفاصيل.',
    'faq.q2': 'ما هي الوثائق التي يجب أن أقدمها؟',
    'faq.a2': 'يجب أن تقدم هوية صالحة (بطاقة هوية أو جواز سفر)، رخصة قيادة صالحة وإثبات إقامة حديث. لبعض المركبات، قد يُطلب إيداع ضمان.',
    'faq.q3': 'أين يمكنني استلام المركبة؟',
    'faq.a3': 'نوفر عدة نقاط استلام في أنحاء الجزائر العاصمة. عند الحجز عبر الهاتف، يمكنك اختيار النقطة الأقرب إليك. كما نوفر خدمة التوصيل للمنزل في بعض مناطق الجزائر العاصمة.',
    'faq.q4': 'ماذا أفعل في حالة مشكلة مع المركبة؟',
    'faq.a4': 'خدمة العملاء متاحة 24/7. في حالة عطل أو مشكلة، اتصل بنا فوراً على رقم الطوارئ المرفق مع حجزك. سنتولى حل المشكلة بسرعة.',
    'faq.q5': 'هل المركبات مؤمّنة؟',
    'faq.a5': 'نعم، جميع مركباتنا مغطاة بتأمين شامل. هذا التأمين يغطي أضرار المركبة والمسؤولية المدنية. خيارات تأمين إضافية متاحة عند الحجز.',
    'faq.q6': 'هل يمكنني إلغاء حجزي؟',
    'faq.a6': 'نعم، يمكنك إلغاء حجزك بالاتصال بنا حتى 24 ساعة قبل بداية التأجير بدون رسوم. للإلغاءات في اللحظة الأخيرة، قد تطبق رسوم حسب شروطنا العامة.',
    'faq.q7': 'كيف يمكنني دفع تكلفة الحجز؟',
    'faq.a7': 'الدفع يتم نقداً عند استلام المركبة. هذا يبسط العملية ويتجنب التعقيدات المتعلقة بالبطاقات المصرفية. نقبل الدينار الجزائري فقط.',
    'faq.moreQuestions': 'لا تجد إجابة لسؤالك؟',
    'faq.contactUs': 'اتصل بنا مباشرة',
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'لديك سؤال؟ حاجة خاصة؟ لا تتردد في الكتابة لنا.',
    'contact.firstName': 'الاسم الأول',
    'contact.lastName': 'اللقب',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'صف طلبك أو سؤالك...',
    'contact.sendMessage': 'إرسال الرسالة',
    'contact.phone': 'الهاتف',
    'contact.address': 'العنوان',
    'contact.addressText': '123 شارع الحرية\n16000 الجزائر، الجزائر',
    'contact.hours': 'أوقات العمل',
    'contact.hoursText': 'الاثنين - الجمعة: 8ص - 6م\nالسبت - الأحد: 9ص - 4م',
    'contact.urgentHelp': 'تحتاج مساعدة عاجلة؟',
    'contact.urgentHelpText': 'خدمة المساعدة الطارئة متاحة 24/7 لجميع عملائنا.',
    'contact.emergencyAssistance': 'المساعدة الطارئة',
    'footer.description': 'موحا لوكيشن، شريكك الموثوق لتأجير المركبات بين الأفراد في الجزائر العاصمة. البساطة، الأمان والشفافية.',
    'footer.helpCenter': 'مركز المساعدة',
    'footer.terms': 'الشروط العامة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'الكوكيز',
    'footer.usage': 'شروط الاستخدام',
    'footer.insurance': 'التأمين',
    'footer.reportProblem': 'الإبلاغ عن مشكلة',
    'contact.ourContact': 'معلومات الاتصال',
    'contact.sendMessage2': 'أرسل لنا رسالة',
    'contact.available24h': 'متاح 24/7',
    'contact.responseIn24h': 'الرد خلال 24 ساعة',
    'reviews.satisfaction': 'رضاكم، أولويتنا',
    'reviews.recommendationText': 'أكثر من 95% من عملائنا ينصحون بنا لأقاربهم.',
    'reviews.averageRating': 'المتوسط العام',
    'reviews.recommendation': 'التوصية',
    'reviews.customerSupport': 'دعم العملاء',
    'reviews.testimonial1': 'خدمة ممتازة! السيارة كانت في حالة ممتازة والحجز بسيط جداً. أنصح بشدة بموحا لوكيشن.',
    'reviews.testimonial2': 'راضية جداً عن تجربتي. الفريق محترف والأسعار تنافسية جداً.',
    'reviews.testimonial3': 'التجربة الأولى وبالتأكيد ليست الأخيرة! عملية سلسة من البداية للنهاية.',
    'about.ourMission': 'مهمتنا',
    'about.missionText': 'تسهيل الوصول للتنقل في الجزائر العاصمة من خلال منصة آمنة وبسيطة وشفافة. نؤمن أن كل شخص يجب أن يتمكن من الوصول بسهولة لمركبة موثوقة عند الحاجة.',
    'about.excellence': 'التميز',
    'about.excellenceDesc': 'خدمة عملاء عالية الجودة ودعم 24/7',
    'about.security': 'الأمان',
    'about.securityDesc': 'مركبات موثقة وتأمين شامل',
    'about.community': 'المجتمع',
    'about.communityDesc': 'مجتمع موثوق بين الأفراد',
    'contact.contactDescription': 'لا تتردد في الاتصال بنا عبر الهاتف أو البريد الإلكتروني أو شخصياً. فريقنا متاح لمساعدتك.'
  }
} as const; 