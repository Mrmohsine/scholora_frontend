"use client";
import Link from "next/link";

import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import PackOverviewCard from "@/components/tutor/packages/PackOverviewCard";
import UpgradePackPage from "@/components/tutor/packages/UpgradePackPage";
import WhyUpgradeSection from "@/components/tutor/packages/WhyUpgradeSection";
import RecentBillingTable from "@/components/tutor/packages/RecentBillingTable";
import { useEffect, useState } from "react";
import { authService } from "@/hooks/auth/useAuth";

const Index = () => {
   const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const userData = authService.getUser();
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    }, []);
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

  return (
    
    <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar */}
          <TutorSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <TutorDashboardHeader user={user} />
            
            {/* Dashboard Content */}
            <main className="flex-1 p-6 space-y-6">
              {/* Package */}.
              <PackOverviewCard />
              <UpgradePackPage title={true} current={true} />
              <WhyUpgradeSection />
              <RecentBillingTable />
            </main>
          </div>
        </div>
  );
};

export default Index;
