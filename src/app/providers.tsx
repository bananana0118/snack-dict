"use client";

import { type ReactNode } from "react";

import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "@/shared/ui/base/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
}
