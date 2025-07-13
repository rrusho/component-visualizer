import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Handshake } from "lucide-react";

type LegalStepProps = {
  data: { eSignature?: string };
  onUpdate: (fields: Partial<{ eSignature: string }>) => void;
};

export default function LegalStep({ data, onUpdate }: LegalStepProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center mb-3 gap-2">
          <Handshake className="h-7 w-7 text-blue-600" aria-label="Legal Agreement" />
          <CardTitle>Legal Agreement</CardTitle>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Please review and agree to the terms and conditions. You must sign electronically to continue.
        </p>
        <Label htmlFor="esignature" className="mb-1">Type your full name as an electronic signature:</Label>
        <input
          id="esignature"
          type="text"
          placeholder="Full Name"
          value={data.eSignature || ""}
          onChange={e => onUpdate({ eSignature: e.target.value })}
          className="mb-4 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          autoComplete="off"
        />
        <p className="text-xs text-slate-400">
          By typing your name, you agree to be legally bound by this agreement.
        </p>
      </CardContent>
    </Card>
  );
}
