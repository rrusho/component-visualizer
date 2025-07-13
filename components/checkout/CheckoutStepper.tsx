// File: components/checkout/CheckoutStepper.tsx
import { Handshake, FileUp, Truck, ClipboardList, CreditCard, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

const stepIcons = [
  Handshake,        // Legal Agreement
  FileUp,           // Upload Documents
  Truck,            // Delivery Options
  ClipboardList,    // Review Order
  CreditCard,       // Payment
  CheckCircle2      // Confirmation
];

type CheckoutStepperProps = {
  currentStep: number;
  steps: string[];
};

export default function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="flex justify-between items-center gap-2 px-4">
      {steps.map((step, idx) => {
        const Icon = stepIcons[idx] || CheckCircle2;
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        const isUpcoming = idx > currentStep;

        return (
          <div
            key={step}
            className={clsx(
              "flex flex-col items-center flex-1",
              isActive && "text-blue-600 font-bold scale-110",
              isCompleted && "text-green-600",
              isUpcoming && "text-gray-400"
            )}
          >
            <div className="relative flex flex-col items-center">
              <Icon
                className={clsx(
                  "mb-2 transition-all",
                  isActive && "w-8 h-8",
                  !isActive && "w-6 h-6"
                )}
                aria-label={step + ' icon'}
              />
              <span
                className={clsx(
                  "text-xs md:text-sm text-center",
                  isActive && "font-semibold",
                  isCompleted && "font-medium"
                )}
              >
                {step}
              </span>
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={clsx(
                    "absolute left-1/2 top-4 h-0.5 w-full md:w-32 -translate-x-1/2",
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                        ? "bg-blue-300"
                        : "bg-gray-300"
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
