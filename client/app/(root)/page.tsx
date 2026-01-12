import TicketList from '@/components/ticket-list';

export default async function LandingPage() {
  const res = await fetch(`http://tickets-srv:3000/api/tickets`);

  if (!res.ok) {
    return <div className="alert alert-danger">Error loading tickets.</div>;
  }

  const tickets = await res.json();
 
  return <TicketList tickets={tickets} />
}