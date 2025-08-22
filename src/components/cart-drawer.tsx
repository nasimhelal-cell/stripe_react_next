"use client"

import type { CartItem } from "@/types/product"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  totalPrice: number
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onClearCart: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  totalPrice,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false)


  const handleCheckout = async () => {
    setLoading(true)
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: items }),
    });

    const session = await res.json();

    if (session.id) {
      await stripe?.redirectToCheckout({ sessionId: session.id });
      setLoading(false)
    } else {
      alert("Something went wrong with checkout.");
    }



  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-sidebar border-l border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <h2 className="font-sans text-xl font-semibold text-sidebar-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-serif text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-medium text-sm text-card-foreground line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="font-sans font-semibold text-primary mb-2">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-serif text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-sidebar-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-lg font-semibold text-sidebar-foreground">
                  Total: ${totalPrice.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCart}
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  Clear Cart
                </Button>
              </div>
              <Button onClick={handleCheckout} className="w-full cursor-pointer">
                {!loading ? 'Checkout' : 'Processing...'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
