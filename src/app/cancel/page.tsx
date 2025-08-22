// app/payment-cancel/page.tsx
"use client"; // needed if using client-side hooks

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Unsuccessful</h1>
        <p className="mt-2 text-gray-600">
          Unfortunately, your payment could not be completed. Please try again or contact support.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={() => router.push("/checkout")} className="w-full">
            Retry Payment
          </Button>
          <Button variant="outline" onClick={() => router.push("/")} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
