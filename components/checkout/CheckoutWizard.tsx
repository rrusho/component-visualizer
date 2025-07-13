"use client";
import { useEffect, useRef, useState } from "react";
import CheckoutStepper from "./CheckoutStepper";
import LegalStep from "./steps/1_LegalStep";
import DocsStep from "./steps/2_DocsStep";
import DeliveryStep from "./steps/3_DeliveryStep";
import ReviewStep from "./steps/4_ReviewStep";
import PaymentStep from "./steps/5_PaymentStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { deduplicateDocs } from "@/components/checkout/steps/deduplicateDocs";
import { getWizardStorageKey, saveWizardState, loadWizardState, clearWizardState } from "@/lib/wizardPersistence";
// import { updateCartMetadata } from "@/lib/medusaApi"; // Temporarily disable for standalone UI
import isEqual from "lodash.isequal";
import { useCart, useUpdateCart } from "@/context/CartContext";
import { UploadedDoc } from "./steps/useDocumentUpload";

const steps = [
  { name: "Legal Agreement", component: LegalStep },
  { name: "Upload Documents", component: DocsStep },
  { name: "Delivery Options", component: DeliveryStep },
  { name: "Review Order", component: ReviewStep },
  { name: "Payment", component: PaymentStep },
  { name: "Confirmation", component: ConfirmationStep },
];

export default function CheckoutWizard() {
  const { user } = useAuth();
  // REFACTOR 1: Use the cart object correctly from our context.
  const { cart } = useCart();
  const router = useRouter();

  const storageKey = user ? getWizardStorageKey(user.email) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    eSignature: "",
    uploadedDocs: [],
    // REFACTOR 2: Removed deliveryMethod and shippingAddress from internal state.
    // The DeliveryStep component and CartContext now manage this.
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFinalStep = currentStep === steps.length - 1;
  const canGoBack = currentStep > 0 && !isFinalStep;

  // The cart items are now read directly from the context.
  const cartItems = cart?.items || [];

  // DOC LOGIC: always deduplicate all required docs in the cart
  const requiredDocs = deduplicateDocs(
    cartItems.flatMap((service: any) => service.requiredDocs || [])
  );

  // This logic for handling document updates is good, no changes needed.
  const lastDocsRef = useRef<any[]>(formData.uploadedDocs || []);
  const handleDocumentsComplete = (docs: any[]) => {
    if (!isEqual(lastDocsRef.current, docs)) {
      lastDocsRef.current = docs;
      setFormData((prev: any) => ({ ...prev, uploadedDocs: docs }));
    }
  };

  // Validation
  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return !!formData.eSignature?.trim();
      case 1:
        if (requiredDocs.length === 0) return true;
        return (
          Array.isArray(formData.uploadedDocs) &&
          requiredDocs.every(doc =>
            formData.uploadedDocs.some(
              (u: any) => u.id === doc.id && u.status === "success"
            )
          )
        );
      case 2:
        // REFACTOR 3: Validation for this step is now simpler.
        // We just need to know if a shipping method has been selected IF the cart has a physical address.
        if (cart?.shipping_address) {
          return cart.shipping_methods && cart.shipping_methods.length > 0;
        }
        // If no shipping address, it means digital delivery was chosen, so it's valid.
        return true;
      case 3:
      case 4:
        return true;
      default:
        return true;
    }
  };
  const isStepValid = validateStep();

  // Persist and load state (this is fine, but we no longer save cartItems here)
  useEffect(() => {
    if (!storageKey) return;
    const { cartItems: _discard, ...restOfFormData } = formData;
    saveWizardState(storageKey, { currentStep, formData: restOfFormData, completedSteps });
  }, [currentStep, formData, completedSteps, storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    const saved = loadWizardState(storageKey);
    if (saved) {
      setFormData(saved.formData);
      setCompletedSteps(saved.completedSteps);
      setCurrentStep(saved.currentStep);
    }
  }, [storageKey]);

  // Warn on close (this is fine)
  useEffect(() => {
    if (isFinalStep) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isFinalStep]);

  // The commented-out auth guard is perfect for UI development.
  /*
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    router.replace("/login");
    return ( ... );
  }
  */

  // Navigation
  const goNext = async () => {
    setError(null);
    if (!isStepValid) return;
    setLoading(true);
    try {
      // REFACTOR 4: Temporarily disable the Medusa API call for UI dev.
      // await updateCartMetadata(cartItems, formData);
      console.log("Simulating save and moving to next step...");
      await new Promise(res => setTimeout(res, 300)); // Simulate async work

      setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (err) {
      setError("Failed to save progress. Please try again.");
    }
    setLoading(false);
  };

  const goBack = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleCancel = () => {
    if (storageKey) clearWizardState(storageKey);
    // Reset wizard state, cart state will be handled by CartContext
    setFormData({ eSignature: "", uploadedDocs: [] });
    setCurrentStep(0);
    setCompletedSteps([]);
    router.push("/");
  };

  // REFACTOR 5: Simplify stepProps. The child components now get most of their data from the CartContext.
  const stepProps = {
    data: formData,
    onUpdate: (d: any) => setFormData((prev: any) => ({ ...prev, ...d })),
    loading,
    error,
  };

  const StepComponent = steps[currentStep]?.component;

  return (
    <div
      className="w-full flex flex-col items-center py-8"
      aria-label="Checkout Wizard"
    >
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col">
        <div className="w-full mb-8">
          <CheckoutStepper
            currentStep={currentStep}
            steps={steps.map(s => s.name)}
            aria-label="Checkout progress"
          />
        </div>
        {error && (
          <div role="alert" className="my-4 text-red-700 bg-red-100 px-4 py-2 rounded" tabIndex={-1}>
            {error}
          </div>
        )}
        <div className="flex-1 my-4" aria-live="polite">
          {StepComponent === DocsStep ? (
            <DocsStep
              userId={user?.email || "mock-user"}
              cartId={cart?.id || "mock-cart"}
              requiredDocs={requiredDocs}
              uploadedDocs={formData.uploadedDocs}
              onDocumentsComplete={handleDocumentsComplete}
            />
          ) : StepComponent ? (
            <StepComponent userId={""} cartId={""} requiredDocs={[]} onDocumentsComplete={function (docs: UploadedDoc[]): void {
              throw new Error("Function not implemented.");
            }} onNext={function (): void {
              throw new Error("Function not implemented.");
            }} cartItems={[]} removeFromCart={function (itemId: number): void {
              throw new Error("Function not implemented.");
            }} deliveryMethod={""} {...stepProps} />
          ) : (
            <p>Invalid step</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <Button
            onClick={goBack}
            disabled={!canGoBack}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleCancel}
            variant="ghost"
          >
            Cancel/Exit
          </Button>
          {currentStep < steps.length - 1 && (
            <Button
              onClick={goNext}
              disabled={!isStepValid || loading}
              aria-label="Go to next step"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}