import { getServiceById } from "@/lib/services";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AddToCartAndBackButtons from "@/components/services/AddToCartAndBackButtons";

// Type the props according to Next.js App Router conventions:
type PageProps = {
  params: { id: string }
};

export default function ServiceDetailPage({ params }: PageProps) {
  // Get the service using the route param
  const service = getServiceById(params.id);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Breadcrumb links={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: service.name }
      ]} />
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <div className="mb-4 text-slate-700">{service.longDescription}</div>
      <div className="mb-2 text-lg font-semibold">${service.price.toFixed(2)}</div>
      <div className="mb-6 text-sm text-slate-500">ETA: {service.time}</div>
      <h2 className="text-lg font-semibold mb-2">Document Requirements</h2>
      <ul className="mb-6">
        {service.requiredDocs.map((doc) => (
          <li key={doc.id} className="mb-2 flex items-start gap-3">
            <span className="font-medium">{doc.label}</span>
            <span className="text-xs text-slate-500">{doc.description}</span>
            <span className="ml-auto text-xs text-slate-400">
              (Max {doc.maxSizeMB}MB, Types: {doc.accept.map(a => a.split("/")[1]).join(", ")} )
              {doc.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-8">
        <AddToCartAndBackButtons service={service} />
      </div>
    </div>
  );
}
