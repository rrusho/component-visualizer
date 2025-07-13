// FILE: components/dashboard/B2BSidebar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function B2BSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-50 p-4 border-r">
      <nav className="flex flex-col space-y-2">
        <Button asChild variant="ghost" className="justify-start">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="ghost" className="justify-start">
          <Link href="#">Checks</Link>
        </Button>
        <Button asChild variant="ghost" className="justify-start">
          <Link href="#">Billing & Credits</Link>
        </Button>
        <Button asChild variant="ghost" className="justify-start">
          <Link href="#">Team Management</Link>
        </Button>
        <Button asChild variant="ghost" className="justify-start">
          <Link href="#">Settings</Link>
        </Button>
      </nav>
    </aside>
  );
}