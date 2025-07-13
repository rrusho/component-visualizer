"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Service } from "@/lib/services";
import { ShoppingCart, Check } from "lucide-react";

export default function AddToCartButton({ service }: { service: Service }) {
  const { addToCart, removeFromCart, isItemInCart } = useCart();
  const inCart = isItemInCart(service.id);

  return (
    <div className="flex gap-2 justify-end">
      {inCart ? (
        <Button
          variant="secondary"
          size="icon"
          aria-label="Remove from Cart"
          title="Remove from Cart"
          onClick={() => removeFromCart(service.id)}
        >
          <Check className="w-6 h-6" />
        </Button>
      ) : (
        <Button
          size="icon"
          aria-label="Add to Cart"
          title="Add to Cart"
          onClick={() => addToCart(service)}
        >
          <ShoppingCart className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
