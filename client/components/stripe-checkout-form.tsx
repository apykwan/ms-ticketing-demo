'use client';

import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripWrapperProps {
    orderId: string;
    price: number;
}

interface PaymentResponse {
  client_secret: string;
}

export default function StripeWrapper({ orderId, price }: StripWrapperProps) {
    const options = {
        mode: 'payment' as const,
        amount: price * 100, 
        currency: 'usd',
    };
    const stripePromise = loadStripe('pk_test_51Sk3DsI5gaonmFBnvITT86vpeNM0ZuNFvMJRpABMHQPHXvy7mWiJiacdBgFeBxoZoRV87AdlAqvVXkLqdZKNpwK000DE1RYJ2z');

    return (
        <Elements stripe={stripePromise} options={options}>
            <ActualForm orderId={orderId} />
        </Elements>
    );
}

function ActualForm({ orderId }: { orderId: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();
        if (submitError) return setErrorMessage(submitError.message as any);

        const { data } = await axios.post<PaymentResponse>('/api/payments', { orderId });
        const { client_secret: clientSecret } = data;

        await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="btn btn-primary mt-2" disabled={!stripe}>Pay Now</button>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </form>
    );
}