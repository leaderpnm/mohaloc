import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageToggleProps {
  variant?: 'default' | 'footer';
}

export const LanguageToggle = ({ variant = 'default' }: LanguageToggleProps) => {
  const { language, toggleLanguage, isRTL } = useLanguage();

  const isFooter = variant === 'footer';

  return (
    <div className={`flex items-center gap-2 rounded-full p-1 transition-colors ${
      isFooter 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
        : 'bg-gray-100 dark:bg-gray-700'
    }`}>
      <div className="px-2 py-1">
        <span className={`text-sm font-medium transition-colors ${
          language === 'fr' 
            ? isFooter ? 'text-white' : 'text-gray-900 dark:text-white'
            : isFooter ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'
        }`}>
          FR
        </span>
      </div>
      
      <Switch
        checked={language === 'ar'}
        onCheckedChange={toggleLanguage}
        aria-label="Basculer la langue"
        className={isFooter 
          ? "data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-600"
          : "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
        }
      />
      
      <div className="px-2 py-1">
        <span className={`text-sm font-medium transition-colors ${
          language === 'ar' 
            ? isFooter ? 'text-white' : 'text-gray-900 dark:text-white'
            : isFooter ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'
        }`}>
          ع
        </span>
      </div>
    </div>
  );
}; 