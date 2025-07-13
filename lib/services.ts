// lib/services.ts
export type RequiredDoc = {
  id: string;
  label: string;
  description: string;
  accept: string[];
  maxSizeMB: number;
  required: boolean;
};

export type Service = {
  id: number;
  name: string;
  price: number;
  desc: string;
  time: string;
  longDescription: string;
  requiredDocs: RequiredDoc[];
};

export const services: Service[] = [
  {
    id: 1,
    name: "National Criminal Record Check",
    price: 29.99,
    desc: "Searches nationwide databases.",
    time: "1-2 Business Days",
    longDescription:
      "This check covers a thorough search of national criminal databases, including federal, state, and local records. Used for pre-employment and compliance.",
    requiredDocs: [
      {
        id: "passport",
        label: "Passport (PDF)",
        description: "A scan or photo of the subject's passport.",
        accept: ["application/pdf", "image/png", "image/jpeg"],
        maxSizeMB: 5,
        required: true,
      },
      {
        id: "address_proof",
        label: "Proof of Address",
        description: "Utility bill, bank statement, or similar document.",
        accept: ["application/pdf", "image/png", "image/jpeg"],
        maxSizeMB: 5,
        required: true,
      },
    ],
  },
  {
    id: 2,
    name: "Education Verification",
    price: 19.99,
    desc: "Confirms degree and attendance.",
    time: "2-3 Business Days",
    longDescription:
      "We verify education history, degree earned, and attendance records with the issuing institution. Ideal for employers and landlords.",
    requiredDocs: [
      {
        id: "transcript",
        label: "Official Transcript",
        description: "Upload a copy of your official transcript.",
        accept: ["application/pdf"],
        maxSizeMB: 5,
        required: true,
      },
      {
        id: "id_card",
        label: "Student ID Card",
        description: "A scan or photo of the relevant student ID.",
        accept: ["application/pdf", "image/png", "image/jpeg"],
        maxSizeMB: 3,
        required: false,
      },
    ],
  },
  {
    id: 3,
    name: "Employment Verification",
    price: 24.99,
    desc: "Verifies past employment history.",
    time: "1-3 Business Days",
    longDescription:
      "Our team contacts employers to confirm work history, roles, and performance. This helps reduce resume fraud.",
    requiredDocs: [
      {
        id: "employment_letter",
        label: "Employment Letter",
        description: "A letter from your previous employer.",
        accept: ["application/pdf", "image/png", "image/jpeg"],
        maxSizeMB: 5,
        required: true,
      },
      {
        id: "pay_stub",
        label: "Recent Pay Stub",
        description: "A copy of your most recent pay stub.",
        accept: ["application/pdf", "image/png"],
        maxSizeMB: 2,
        required: false,
      },
    ],
  },
];

// Helper to fetch all services
export function getAllServices(): Service[] {
  return services;
}

// Helper to fetch by ID
export function getServiceById(id: number | string): Service | undefined {
  return services.find((s) => s.id === Number(id));
}
