'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import useRequest from '@/hooks/use-request';
import { Ticket } from '@/types/ticket';

export default function TicketShow() {
    const { ticketId } = useParams<{ ticketId: string }>();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const router = useRouter();
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: { ticketId },
        onSuccess: (order) => router.push(`/orders/${order.id}`)
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/api/tickets/${ticketId}`);
                setTicket(data as Ticket);
            } catch (err: any) {
                router.push('/');
                return;
            }
        })();
    }, []);

    if (!ticket) return <div>Loading ticket...</div>;
    return (
        <div>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button onClick={doRequest} className="btn btn-primary">Purchase</button>
        </div>
    );
}