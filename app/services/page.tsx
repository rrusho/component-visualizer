import { getAllServices } from "@/lib/services";
import ServiceCard from "@/components/services/ServiceCard";
import Breadcrumb from "@/components/layout/Breadcrumb";

// This is a Server Component, so we fetch data directly.
export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div>
      <Breadcrumb links={[{ href: "/services", label: "Services" }]} />
      <h1 className="text-3xl font-bold text-center mb-2">Our Verification Services</h1>
      <p className="text-center text-slate-500 mb-10">
        Choose from our comprehensive list of background checks to meet your needs.
      </p>

      {/* Grid layout for the service cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}