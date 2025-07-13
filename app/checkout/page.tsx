"use client";

import CheckoutWizard from "@/components/checkout/CheckoutWizard";
// import { useAuth } from "@/context/AuthContext"; // We don't need this for UI development
// import { useCart } from "@/context/CartContext"; // Not needed directly on this page
// import { useRouter } from "next/navigation"; // Not needed for UI development
// import { useEffect } from "react"; // Not needed for UI development
import Breadcrumb from "@/components/layout/Breadcrumb";
// import Loader from "@/components/ui/loader"; // Not needed for UI development

export default function CheckoutPage() {
    // --- All authentication and redirection logic is temporarily disabled for UI development ---
    /*
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        // This block was causing the redirect to the dashboard/homepage.
        // It should be re-enabled when the app is connected to a real backend.
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    // This block was preventing the CheckoutWizard from rendering.
    if (!isAuthenticated) {
        return <Loader message="Redirecting to login..." />;
    }
    */
    // --- End of disabled section ---

    // The component now unconditionally renders the checkout flow.
    return (
        <div>
            <Breadcrumb links={[
                { href: '/services', label: 'Services' },
                { href: '/checkout', label: 'Checkout' }
            ]} />
            <h1 className="text-3xl font-bold text-center mb-2">Secure Checkout</h1>
            <p className="text-center text-slate-500 mb-10">Follow the steps below to complete your order.</p>

            {/* The CheckoutWizard will now always render, allowing you to see and test it. */}
            <CheckoutWizard />
        </div>
    );
}