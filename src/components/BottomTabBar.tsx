import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, Users } from 'lucide-react';
import { useIsApp } from '@/hooks/useIsApp';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BottomTabBar() {
  const isApp = useIsApp();
  const { t } = useLanguage();

  if (!isApp) return null;

  const tabs = [
    { to: '/', icon: Home, label: t('홈', 'Home'), end: true },
    { to: '/business', icon: Compass, label: t('살펴보기', 'Explore'), end: false },
    { to: '/donation', icon: Heart, label: t('후원하기', 'Donate'), end: false },
    { to: '/volunteer', icon: Users, label: t('동참하기', 'Join Us'), end: false },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-4 h-16">
        {tabs.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-orange-600'
                  : 'text-slate-400'
              }`
            }
          >
            <Icon size={22} strokeWidth={2.2} />
            <span className="text-[11px] font-semibold">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
