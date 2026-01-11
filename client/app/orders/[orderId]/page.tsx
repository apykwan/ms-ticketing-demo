import { headers } from 'next/headers';

interface OrderShowProps {
    params: Promise<{ orderId: string; }>
}

export default async function OrderShow ({ params }: OrderShowProps) {
    const { orderId } = await params;
    const requestHeaders = await headers();

    const cookie = requestHeaders.get('cookie') || '';

    const res = await fetch(`http://orders-srv:3000/api/orders/${orderId}`, {
        headers: { cookie } 
    });

    if (!res.ok) {
        return <div className="alert alert-danger">Order not found or unauthorized.</div>;
    }

    const order = await res.json();
    console.log(order);

    return (
        <div>OrderShow</div>
    );
}