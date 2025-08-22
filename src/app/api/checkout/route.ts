import { CartItem } from "@/types/product";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20"
} as any);

export async function POST(req: Request) {
    try {
        const { products } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: products.map((item: CartItem) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses cents
                },
                quantity: item.quantity,
            })),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        return NextResponse.json({ id: session.id });
    } catch (err: unknown) {
        // Safe error handling
        const message = err instanceof Error ? err.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
