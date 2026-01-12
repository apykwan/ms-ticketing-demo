'use client';
import Link from 'next/link';

import { Ticket } from '@/types/ticket';

interface TicketListProps {
    tickets: Ticket[] | [];
}

export default function TicketList({ tickets = [] }: TicketListProps) {
    let ticketList = [];
    if (tickets.length > 0) {
        ticketList = tickets.map((ticket: Ticket) => {
            return (
                <tr key={ticket.id}>
                <td className="text-primary text-decoration-none">
                    <Link href={`/tickets/${ticket.id}`}>
                    {ticket.title}
                    </Link>
                </td>
                <td>{ticket.price}</td>
                <td className="text-decoration-none">
                    <Link href={`/tickets/${ticket.id}`}>
                    <b>View</b>
                    </Link>
                </td>
                </tr>
            );
        });
    }
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
}