'use client';

import { Order } from '@/types/order';

interface OrderListProps {
    orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
    return (
        <ul>
            {orders.map(order => {
                return (
                    <li key={order.id}>
                        <span className="text-secondary">{order.ticket.title}</span> - <span className="text-danger">{order.status}</span>
                    </li>
                )
            })}
        </ul>
    );
}