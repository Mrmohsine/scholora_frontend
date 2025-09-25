// components/tutor/Sidebar.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
 LayoutDashboard, 
 BookOpen, 
 Calendar, 
 DollarSign, 
 MessageCircle, 
 Users, 
 BarChart3, 
 Settings 
} from 'lucide-react';

interface SidebarItem {
 name: string;
 href: string;
 icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
 { name: 'Dashboard', href: '/tutor-portal/dashboard', icon: LayoutDashboard },
 { name: 'My Classes', href: '/tutor-portal/classes', icon: BookOpen },
 { name: 'Calendar', href: '/tutor-portal/calendar', icon: Calendar },
 { name: 'Finance', href: '/tutor-portal/finance', icon: DollarSign },
 { name: 'Messages', href: '/tutor-portal/messages', icon: MessageCircle },
 { name: 'Students', href: '/tutor-portal/students', icon: Users },
 { name: 'Stats', href: '/tutor-portal/stats', icon: BarChart3 },
 { name: 'Settings', href: '/tutor-portal/settings', icon: Settings },
];

export default function TutorSidebar() {
 const pathname = usePathname();

 return (
   <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
     {/* Logo */}
    <div className="flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <Image
        src="/images/logos/logo_blue.png"
        alt="Scholora Logo"
        width={200}
        height={320}
        className="w-auto p-0"
        style={{ margin: '-50px 0' }}
      />
      </Link>
    </div>

     {/* Navigation */}
     <nav className="flex-1 px-4 py-6 space-y-2">
       {sidebarItems.map((item) => {
         const isActive = pathname === item.href;
         const Icon = item.icon;

         return (
           <Link
             key={item.name}
             href={item.href}
             className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
               isActive
                 ? 'bg-blue-600 text-white'
                 : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900'
             }`}
           >
             <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-900'}`} />
             {item.name}
           </Link>
         );
       })}
     </nav>
   </div>
 );
}