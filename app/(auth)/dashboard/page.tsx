// FILE: app/(auth)/dashboard/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
// ... other imports
import Link from "next/link";
import Breadcrumb from '@/components/layout/Breadcrumb'; // <-- 1. IMPORT
import B2CDashboard from "@/components/dashboard/B2CDashboard";

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // ... redirect logic
  }

  // Determine the breadcrumb trail based on user role
  const breadcrumbLinks = user?.role === 'b2b'
      ? [{ href: '/dashboard', label: 'B2B Dashboard' }]
      : [{ href: '/dashboard', label: 'My Dashboard' }];

  return (
    <div>
      {/* 2. ADD THE BREADCRUMB COMPONENT */}
      <Breadcrumb links={breadcrumbLinks} />

      {/* Render the correct dashboard */}
      {user?.role === 'b2b' ? <B2CDashboard /> : <B2CDashboard />}
    </div>
  );
}