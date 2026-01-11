'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';


import { Ticket } from '@/types/ticket';

export default function LandingPage() {
  const [tickets, setTickets] = useState<Ticket[] | []>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/tickets');
      setTickets(data as Ticket[]);
    })();
  }, []);

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