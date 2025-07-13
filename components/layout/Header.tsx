// FILE: components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // 1. Import useCart
import { Button } from "@/components/ui/button";
import { User, LogOut, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const cart = useCart();
  const router = useRouter();

  const handleMockLogin = () => {
    login({ name: "HR Admin", email: "hr@company.com", role: "b2b" });
    router.push('/dashboard');
  };

  const handleMockLoginB2C = () => {
    login({ name: "John Doe", email: "john.d@email.com", role: "b2c" });
    router.push('/dashboard');
  };

  const totalItems = cart?.items?.length || 0;

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="font-bold text-xl">Logo</Link>
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/services" className="text-gray-600 hover:text-black">Order New Check</Link>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/services" className="text-gray-600 hover:text-black">Services</Link>
              <Link href="#" className="text-gray-600 hover:text-black">For Business</Link>
              <Link href="#" className="text-gray-600 hover:text-black">Pricing</Link>
              <Link href="#" className="text-gray-600 hover:text-black">Support</Link>
            </nav>
          )}
        </div>

        {/* 3. This section is now dynamic based on cart and auth state */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {totalItems > 0 && (
                <Button asChild variant="outline">
                  <Link href="/checkout">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Cart ({totalItems})
                  </Link>
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleMockLogin}>Login (B2B)</Button>
              <Button variant="ghost" onClick={handleMockLoginB2C}>Login (B2C)</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}