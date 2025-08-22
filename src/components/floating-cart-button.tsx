"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface FloatingCartButtonProps {
  itemCount: number
  onClick: () => void
}

export function FloatingCartButton({ itemCount, onClick }: FloatingCartButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 size-16 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 animate-bounce"
      size="sm"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
    </Button>
  )
}
