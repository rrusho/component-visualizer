// File: components/checkout/CreditCardForm.tsx

import React from "react";

interface CreditCardFormProps {
    onCharge: (token: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> & { charge?: (token: string) => Promise<void> } = ({ onCharge }) => {
    // Placeholder form UI
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onCharge("dummy-token");
            }}
        >
            <p className="mb-2 text-sm text-gray-600">This is a demo credit card form.</p>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Place Order (Demo)
            </button>
        </form>
    );
};

// Dummy static charge method for demonstration to prevent runtime errors
CreditCardForm.charge = async (token: string) => {
    console.log("Simulating charge with token:", token);
    // Simulate async charge
    return new Promise<void>(resolve => setTimeout(resolve, 500));
};

export default CreditCardForm;