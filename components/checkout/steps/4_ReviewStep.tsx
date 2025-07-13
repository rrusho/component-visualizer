// FILE: components/checkout/steps/4_ReviewStep.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ServiceItem } from "@/context/CartContext";

type Props = {
  cartItems: ServiceItem[];
  removeFromCart: (itemId: number) => void;
  deliveryMethod: string;
};

export default function ReviewStep({ cartItems, removeFromCart, deliveryMethod }: Props) {
  const shippingCost = deliveryMethod === 'physical' ? 15.00 : 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + shippingCost;

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-6">Review & Confirm Your Order</h3>

        {/* Services List */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold text-lg w-24 text-right">${item.price.toFixed(2)}</p>
                <Button variant="ghost" size="icon" className="ml-4 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            {/* Promo Code */}
            <div className="flex items-center mb-6">
              <input type="text" placeholder="Promo Code" className="p-2 border rounded-l-md flex-grow" />
              <Button className="rounded-l-none">Apply</Button>
            </div>

            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-md">
                <span className="text-slate-600">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'service' : 'services'})</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-md">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold pt-2 border-t mt-2">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}