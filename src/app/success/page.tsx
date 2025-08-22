// app/success/page.tsx
"use client"; // <-- MUST be at the top for client-side hooks

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <Button
          className="mt-6 w-full"
          onClick={() => router.push("/")} // redirect to shop page
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
