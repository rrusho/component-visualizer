"use client";
import Link from "next/link";

export type BreadcrumbLink = { label: string; href?: string };

export default function Breadcrumb({ links = [] }: { links: BreadcrumbLink[] }) {
  if (!Array.isArray(links) || links.length === 0) return null;

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center text-sm gap-1 text-slate-600">
        {links.map((link, idx) => {
          const isLast = idx === links.length - 1;
          return (
            <li key={link.label + idx} className="flex items-center gap-1">
              {link.href && !isLast ? (
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-semibold text-black" : ""}>
                  {link.label}
                </span>
              )}
              {!isLast && <span className="mx-1 text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
