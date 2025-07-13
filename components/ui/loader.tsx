// FILE: components/ui/loader.tsx
import { Loader2 } from "lucide-react";

type Props = {
  message: string;
  subMessage?: string;
};

export default function Loader({ message, subMessage }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-slate-400 mb-4" />
      <p className="font-semibold text-slate-700">{message}</p>
      {subMessage && <p className="text-sm text-slate-500 mt-1">{subMessage}</p>}
    </div>
  );
}