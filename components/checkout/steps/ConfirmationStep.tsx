// FILE: components/checkout/steps/ConfirmationStep.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";

export function ConfirmationStep() {
    return (
        <Card className="shadow-lg">
            <CardContent className="text-center pt-10 pb-10">
                <PartyPopper className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="font-bold text-3xl mb-2">Thank You! Order Placed!</h2>
                <p className="text-slate-600 text-lg">Order Number: #123456789</p>
                <p className="mt-4 text-slate-600">
                    You can track the status of your order in your dashboard.
                    <br />
                    You will also be notified via email when the report is ready.
                </p>
                <Button 
                    className="mt-8 text-lg py-6" 
                    onClick={() => window.location.href = '/dashboard'}
                >
                    Go to My Dashboard
                </Button>
            </CardContent>
        </Card>
    );
}