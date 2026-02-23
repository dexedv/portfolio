import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  return (
    <button
      id="lang-btn"
      onClick={() => window.toggleLanguage()}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 text-sm font-medium"
    >
      <Globe className="w-4 h-4" />
      <span>EN</span>
    </button>
  );
}
