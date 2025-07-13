// FILE: components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-gray-600 hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:underline">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Services</h3>
            <ul className="space-y-1">
              <li><Link href="/services" className="text-gray-600 hover:underline">Pre-Employment</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:underline">Tenant Screening</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-gray-600 hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:underline">FCRA Notice</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-gray-600 hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:underline">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Digital Verification Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}