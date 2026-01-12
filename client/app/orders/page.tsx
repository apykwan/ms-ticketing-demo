import { headers } from 'next/headers';

import OrderList from '@/components/order-list';

export default async function OrderIndex () {
    const requestHeaders = await headers();
    const cookie = requestHeaders.get('cookie') || '';

    const res = await fetch(`http://orders-srv:3000/api/orders`, {
        headers: { cookie } 
    });

    if (!res.ok) {
        return <div className="alert alert-danger">Order not found or unauthorized.</div>;
    }

    const orders = await res.json();

    return <OrderList orders={orders} />;
}