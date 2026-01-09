'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { useCurrUser } from '@/contexts/current-user-context';

export default function LandingPage() {
  const { currUser: currentUser } = useCurrUser();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/tickets');
      setTickets(data as []);
    })();
  }, []);

  const ticketList = tickets.map((ticket) => {
  return (
    <tr key={ticket.id}>
      <td className="text-primary">
        <Link href={`/tickets/${ticket.id}`}>
          {ticket.title}
        </Link>
      </td>
      <td>{ticket.price}</td>
    </tr>
  );
});
  return (
    <div>
      {currentUser ? <h2 className="mb-3">Welcome {currentUser.email}</h2> : 'Not Log In'}

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
}