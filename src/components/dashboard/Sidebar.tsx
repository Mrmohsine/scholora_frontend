'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

// Ici, importe les icônes que tu utilises pour la navigation
import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftEllipsisIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onClose?: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Students', href: '/dashboard/students', icon: UsersIcon },
  { name: 'Tutors', href: '/dashboard/tutors', icon: AcademicCapIcon },
  { name: 'Verification', href: '/dashboard/verification', icon: CheckCircleIcon },
  { name: 'Subject Performance', href: '/dashboard/subject-performance', icon: ChartBarIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: PresentationChartLineIcon },
  { name: 'Revenue', href: '/dashboard/revenue', icon: CurrencyDollarIcon },
  { name: 'Support', href: '/dashboard/support', icon: ChatBubbleLeftEllipsisIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg">
     {/* Logo centré */}
    {/* Logo centré et grand */}
<div className="flex items-center justify-center border-b border-gray-200 relative">
  <Image
    src="/images/logos/logo_blue.png"
    alt="Scholora Logo"
    width={150}   // très large
    height={150}  // garde proportion carré
    className="rounded-lg"
  />

  {/* Bouton fermer pour mobile */}
  <button
    onClick={onClose}
    className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>



      {/* Navigation principale */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className={`ml-3 inline-block py-0.5 px-2 text-xs rounded-full ${
                  active
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Section utilisateur et déconnexion */}
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/auth/logout"
          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
          <span>Déconnexion</span>
        </Link>
      </div>

      {/* Informations version */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Scholora Dashboard</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
