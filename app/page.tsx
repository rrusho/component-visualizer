// FILE: app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => (
  <section className="text-center py-20">
    <h1 className="text-4xl md:text-5xl font-bold">Fast, Compliant Background Checks</h1>
    <p className="text-lg text-slate-600 mt-4">Secure, on-demand verification for individuals and businesses.</p>
    <div className="mt-8 space-x-4">
      <Button asChild size="lg"><Link href="/services">View Services</Link></Button>
      <Button asChild size="lg" variant="outline"><Link href="#">For Business</Link></Button>
    </div>
  </section>
);

const TrustBar = () => (
  <section className="bg-gray-50 py-4">
    <div className="container mx-auto flex justify-center items-center space-x-8 text-sm text-slate-500">
      <span>FCRA Compliant</span>
      <span>GDPR Ready</span>
      <span>Secure SSL Encryption</span>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-16">
    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      <div>
        <div className="text-4xl font-bold text-blue-500 mb-2">1</div>
        <h3 className="font-semibold text-lg">Select Your Checks</h3>
        <p className="text-gray-600">Choose from our a-la-carte services or pre-built packages.</p>
      </div>
      <div>
        <div className="text-4xl font-bold text-blue-500 mb-2">2</div>
        <h3 className="font-semibold text-lg">Provide Consent & Info</h3>
        <p className="text-gray-600">The subject provides their details through our secure portal.</p>
      </div>
      <div>
        <div className="text-4xl font-bold text-blue-500 mb-2">3</div>
        <h3 className="font-semibold text-lg">Get Your Secure Report</h3>
        <p className="text-gray-600">Receive comprehensive results, typically within 1-3 days.</p>
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <TrustBar />
      <HowItWorks />
    </div>
  );
}