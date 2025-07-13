// FILE: components/dashboard/B2CDashboard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';

export default function B2CDashboard() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h1>
      <Button className="mb-6">Order a New Check</Button>
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Order ID</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Services</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">#1001</td>
                <td className="p-2">2025-06-10</td>
                <td className="p-2">Criminal + Education Check</td>
                <td className="p-2">Complete</td>
                <td className="p-2"><Button variant="outline">View Report</Button></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}