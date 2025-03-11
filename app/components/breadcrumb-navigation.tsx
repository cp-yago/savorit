import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface BreadcrumbNavigationProps {
  items: {
    label: string;
    href?: string;
    isCurrent?: boolean;
  }[];
}

export default function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
  return (
    <Breadcrumb className="text-2xl font-bold">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`breadcrumb-fragment-${index}`}>
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>
                  <h1 className="text-2xl font-bold">{item.label}</h1>
                </BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="hover:text-gray-900 transition-colors">
                    <h1 className="text-2xl font-bold">{item.label}</h1>
                  </Link>
                </BreadcrumbLink>
              ) : (
                <span>{item.label}</span>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
} 