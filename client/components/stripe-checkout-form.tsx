'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import useRequest from '@/hooks/use-request';

interface StripWrapperProps {
    orderId: string;
    price: number;
}

const stripePromise = loadStripe('pk_test_51Sk3DsI5gaonmFBnvITT86vpeNM0ZuNFvMJRpABMHQPHXvy7mWiJiacdBgFeBxoZoRV87AdlAqvVXkLqdZKNpwK000DE1RYJ2z');

export default function StripeWrapper({ orderId, price }: StripWrapperProps) {
    const options = {
        mode: 'payment' as const,
        amount: price * 100, 
        currency: 'usd',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <ActualForm orderId={orderId} />
        </Elements>
    );
}

function ActualForm({ orderId }: { orderId: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [stripeError, setStripeError] = useState<React.ReactNode | null>(null);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: { orderId },
        onSuccess: async (data) => {
            await stripe.confirmPayment({
                elements,
                clientSecret: data.client_secret,
                confirmParams: {
                    return_url: `${window.location.origin}/orders`,
                },
            });
        }
    });

    async function handleSubmit (event: React.FormEvent) {
        event.preventDefault();
        setStripeError(null);

        if (!stripe || !elements) return;

        // Trigger validation and wallet collection
        const { error: submitError } = await elements.submit();

        // If the card is invalid/expired, show the error and STOP
        if (submitError) {
            setStripeError(
                <div className="alert alert-danger" role="alert">
                    <h4>Ooops...</h4>
                    <p>{submitError.message || 'Invalid card details'}</p>
                </div>
            );
            return;
        }

        doRequest();
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="btn btn-primary mt-2" disabled={!stripe}>Pay Now</button>
            {errors}
            {stripeError}
        </form>
    );
}