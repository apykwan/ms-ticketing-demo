'use client';

import { useRouter } from 'next/navigation';

import useRequest from '@/hooks/use-request';
import { Ticket } from '@/types/ticket';

interface TicketDetailProps {
    ticket: Ticket;
}

export default function TicketDetail({ ticket }: TicketDetailProps) {
    const router = useRouter();
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: { ticketId: ticket.id },
        onSuccess: (order) => router.push(`/orders/${order.id}`)
    });

    return (
        <div>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button onClick={doRequest} className="btn btn-primary">Purchase</button>
        </div>
    );
}