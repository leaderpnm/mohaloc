import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1 transition-colors">
      <div className="px-2 py-1">
        <Sun className={`h-4 w-4 transition-colors ${isDark ? 'text-gray-400 dark:text-gray-500' : 'text-yellow-500'}`} />
      </div>
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
      />
      
      <div className="px-2 py-1">
        <Moon className={`h-4 w-4 transition-colors ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
      </div>
    </div>
  );
}; 