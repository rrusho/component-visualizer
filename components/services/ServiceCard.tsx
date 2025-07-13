"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Service } from "@/lib/services";
import { useCart } from "@/context/CartContext";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const { addToCart, removeFromCart, isItemInCart } = useCart();
  const inCart = isItemInCart(String(service.id));

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-all">
      <CardHeader className="flex-grow">
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full justify-end pt-0">
        <div className="mb-2 text-lg font-semibold">${service.price.toFixed(2)}</div>
        <div className="mb-4 text-sm text-slate-500">ETA: {service.time}</div>
        {/* Action Buttons at the bottom right */}
        <div className="flex gap-2 justify-end mt-auto">
          <Link href={`/services/${service.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
          {inCart ? (
            <Button variant="secondary" size="sm" onClick={() => removeFromCart(String(service.id))}>
              Remove from Cart
            </Button>
          ) : (
            <Button size="sm" onClick={() => addToCart(service)}>
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
