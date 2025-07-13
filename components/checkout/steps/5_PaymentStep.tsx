// File: components/checkout/steps/5_PaymentStep.tsx
"use client";

import React, { useState } from "react";
import { useCart, useUpdateCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CreditCardForm from "@/components/checkout/CreditCardForm";

type BillingAddress = {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    country_code: string;
    postal_code: string;
    phone?: string;
};

interface Props {
    onNext: () => void;
}

export default function PaymentStep({ onNext }: Props) {
    const { data: cart, isLoading: cartLoading } = useCart();
    const updateCart = useUpdateCart(cart?.id || "");

    const [method, setMethod] = useState<"" | "card" | "paypal">("");
    const [billingSame, setBillingSame] = useState(true);
    const [billingAddress, setBillingAddress] = useState<BillingAddress>(
        cart?.billing_address ?? {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            country_code: cart?.region?.currency_code || "BD",
            postal_code: "",
            phone: "",
        }
    );

    const handleCharge = async (token: string) => {
        if (!cart?.id) return;
        if (!billingSame) {
            await updateCart.mutateAsync({
                billing_address: billingAddress,
            });
        }
        if (typeof CreditCardForm.charge === "function") {
            await CreditCardForm.charge(token);
        }
        onNext();
    };

    if (cartLoading) {
        return <div>Loading payment…</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Payment</h2>

            {/* Payment method radio */}
            <RadioGroup
                value={method}
                onValueChange={(value) => setMethod(value as "" | "card" | "paypal")}
                className="space-y-4"
            >
                <div className="flex items-center">
                    <RadioGroupItem value="card" id="pm-card" />
                    <Label htmlFor="pm-card" className="ml-2">
                        Credit/Debit Card
                    </Label>
                </div>
                <div className="flex items-center">
                    <RadioGroupItem value="paypal" id="pm-paypal" />
                    <Label htmlFor="pm-paypal" className="ml-2">
                        PayPal
                    </Label>
                </div>
            </RadioGroup>

            {/* Card form + conditional billing address */}
            {method === "card" && (
                <div className="space-y-4">
                    <CreditCardForm onCharge={handleCharge} />

                    {cart?.shipping_address && (
                        <div className="flex items-center space-x-2">
                            <input
                                id="billing-same"
                                type="checkbox"
                                checked={billingSame}
                                onChange={() => setBillingSame((s) => !s)}
                                className="rounded"
                            />
                            <Label htmlFor="billing-same">
                                My billing address is the same as my shipping address
                            </Label>
                        </div>
                    )}

                    {!billingSame && (
                        <form className="space-y-4">
                            <h3 className="text-lg font-medium">Billing Address</h3>
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
                                    ] as [keyof BillingAddress, string][]
                                ).map(([key, label]) => (
                                    <div
                                        key={key}
                                        className={
                                            key === "address_1" || key === "address_2"
                                                ? "col-span-2"
                                                : ""
                                        }
                                    >
                                        <Label htmlFor={`billing-${key}`}>{label}</Label>
                                        <input
                                            id={`billing-${key}`}
                                            required={key !== "address_2"}
                                            value={(billingAddress[key] as string) || ""}
                                            onChange={(e) =>
                                                setBillingAddress((prev) => ({
                                                    ...prev,
                                                    [key]: e.target.value,
                                                }))
                                            }
                                            className="mb-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* PayPal fallback */}
            {method === "paypal" && (
                <Button onClick={onNext}>Continue with PayPal</Button>
            )}
        </div>
    );
}
