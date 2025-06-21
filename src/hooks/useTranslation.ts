import { useLanguage } from './useLanguage';
import { translations, TranslationKey } from '@/lib/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.fr[key] || key;
  };

  return { t };
}; 