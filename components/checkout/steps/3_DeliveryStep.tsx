// File: components/checkout/steps/3_DeliveryStep.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useCart, useUpdateCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Address = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  country_code: string;
  postal_code: string;
  phone?: string;
};

type ShippingOption = {
  id: string;
  name: string;
  amount: number;
};

interface DeliveryStepProps {
  onNext: () => void;
}

export default function DeliveryStep({ onNext }: DeliveryStepProps) {
  const { data: cart, isLoading: cartLoading } = useCart();
  const updateCart = useUpdateCart(cart?.id || "");

  const [deliveryType, setDeliveryType] = useState<"" | "digital" | "physical">("");
  const [address, setAddress] = useState<Address>({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    country_code: "BD",
    postal_code: "",
    phone: "",
  });
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [loadingOptions, setLoadingOptions] = useState(false);

  useEffect(() => {
    if (deliveryType === "physical" && cart?.shipping_address) {
      fetchOptions();
    }
  }, [deliveryType, cart?.shipping_address]);

  const handleDeliveryTypeContinue = () => {
    if (deliveryType === "digital") {
      onNext();
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart?.id) return;
    await updateCart.mutateAsync({
      shipping_address: address,
    });
  };

  const fetchOptions = async () => {
    if (!cart?.region) return;
    setLoadingOptions(true);
    try {
      const res = await fetch(`/store/shipping-options?region_id=${cart.region_id}`);
      const json = await res.json();
      setOptions(json.shipping_options || []);
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleOptionSelect = async () => {
    if (!cart?.id || !selectedOption) return;
    await updateCart.mutateAsync({
      shipping_methods: [{ option_id: selectedOption }],
    });
    onNext();
  };

  if (cartLoading) {
    return <div>Loading cart…</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Delivery Options</h2>

      {/* 1) Digital vs Physical */}
      <RadioGroup
        value={deliveryType}
        onValueChange={(value) => setDeliveryType(value as "" | "digital" | "physical")}
        className="space-y-4"
      >
        <div className="flex items-center">
          <RadioGroupItem value="digital" id="delivery-digital" />
          <Label htmlFor="delivery-digital" className="ml-2">
            Digital Report
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="physical" id="delivery-physical" />
          <Label htmlFor="delivery-physical" className="ml-2">
            Physical Copy
          </Label>
        </div>
      </RadioGroup>

      {/* 2) If digital, skip straight ahead */}
      {deliveryType === "digital" && (
        <Button onClick={handleDeliveryTypeContinue}>Continue</Button>
      )}

      {/* 3) If physical & no address yet, show address form */}
      {deliveryType === "physical" && !cart?.shipping_address && (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ["first_name", "First Name"],
                ["last_name", "Last Name"],
                ["address_1", "Address Line 1"],
                ["address_2", "Address Line 2"],
                ["city", "City"],
                ["postal_code", "Postal Code"],
                ["country_code", "Country"],
                ["phone", "Phone"],
              ] as [keyof Address, string][]
            ).map(([key, label]) => (
              <div
                key={key}
                className={
                  key === "address_1" || key === "address_2"
                    ? "col-span-2"
                    : ""
                }
              >
                <Label htmlFor={key}>{label}</Label>
                <input
                  id={key}
                  required={key !== "address_2"}
                  value={address[key] || ""}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="mb-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            ))}
          </div>
          <Button type="submit" disabled={updateCart.isLoading}>
            Continue
          </Button>
        </form>
      )}

      {/* 4) If physical & address saved, show shipping options */}
      {deliveryType === "physical" && cart?.shipping_address && (
        <div>
          <h3 className="text-xl font-medium mb-4">Select Courier</h3>
          {loadingOptions ? (
            <p>Loading shipping options…</p>
          ) : options.length === 0 ? (
            <p>No shipping options available.</p>
          ) : (
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="space-y-4"
            >
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div>
                    <div>{opt.name}</div>
                    <div className="text-sm text-gray-500">
                      {(opt.amount / 100).toFixed(2)}{" "}
                      {cart?.region?.currency_code.toUpperCase()}
                    </div>
                  </div>
                  <RadioGroupItem
                    value={opt.id}
                    id={`ship-${opt.id}`}
                  />
                </div>
              ))}
            </RadioGroup>
          )}
          <Button
            className="mt-4"
            disabled={!selectedOption}
            onClick={handleOptionSelect}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
