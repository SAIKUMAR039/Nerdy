import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

export async function initiateTokenPurchase(userId: string, amount: number) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        tokens: amount,
        priceInCents: Math.floor(amount * 0.4), // $0.4 per token
      }),
    });

    const session = await response.json();
    const stripe = await stripePromise;
    
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error initiating purchase:', error);
    throw error;
  }
}