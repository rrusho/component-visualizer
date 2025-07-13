// FILE: app/(auth)/dashboard/layout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import B2BSidebar from "@/components/dashboard/B2BSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user?.role === 'b2b') {
    return (
      <div className="flex">
        <B2BSidebar />
        <div className="flex-grow p-6">
          {children}
        </div>
      </div>
    );
  }

  // B2C users get a simpler layout without the sidebar
  return <>{children}</>;
}