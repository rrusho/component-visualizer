"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Service } from "@/lib/services";
import { ShoppingCart, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddToCartAndBackButtons({ service }: { service: Service }) {
  const { addToCart, removeFromCart, isItemInCart } = useCart();
  const inCart = isItemInCart(service.id);

  return (
    <div className="flex gap-2 justify-end">
      <Link href="/services">
        <Button
          variant="outline"
          size="sm"
          aria-label="Back to Services"
          title="Back to Services"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
      </Link>
      {inCart ? (
        <Button
          variant="secondary"
          size="sm"
          aria-label="Remove from Cart"
          title="Remove from Cart"
          className="flex items-center gap-2"
          onClick={() => removeFromCart(service.id)}
        >
          <Check className="w-5 h-5" />
          <span>Remove</span>
        </Button>
      ) : (
        <Button
          size="sm"
          aria-label="Add to Cart"
          title="Add to Cart"
          className="flex items-center gap-2"
          onClick={() => addToCart(service)}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </Button>
      )}
    </div>
  );
}
