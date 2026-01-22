"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import StudentSidebar from "@/components/student/Sidebar";
import StudentDashboardHeader from "@/components/student/Dashboard/DashboardHeader";
import { authService } from "@/lib/auth/authService";

function StudentProfileContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
      console.log("User Data:", userData);
      setFormData({
        firstName: userData.first_name ?? "",
        lastName: userData.last_name ?? "",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
        address: userData.address ?? "",
      });
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

  const handleProfileSubmit = async () => {
    console.log("Submitting profile with data:", formData);
    try {
      await authService.updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      const fresh =  authService.getUser();
      setUser(fresh);

      alert("Profile updated");
    } catch (e: any) {
      alert(e.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />

        {/* Settings Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 relative">
            {/* Save Button */}
            <button
              onClick={handleProfileSubmit}
              className="absolute top-8 right-8 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
            >
              Save Changes
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-700">
                    {user?.first_name?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(" ");
                    setFormData({
                      ...formData,
                      firstName: parts[0] || "",
                      lastName: parts.slice(1).join(" ") || "",
                    });
                  }}
                  placeholder="Your Full Name"
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Your Phone Number"
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="profile-email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your Email"
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="profile-address"
                  autoComplete="off"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Your Address"
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentProfileContent />
    </ProtectedRoute>
  );
}
