import TicketDetail from '@/components/ticket-detail';

interface TicketShowProps {
    params: Promise<{ ticketId: string; }>
}

export default async function TicketShow({ params }: TicketShowProps) {
    const { ticketId } = await params;
    const res = await fetch(`http://tickets-srv:3000/api/tickets/${ticketId}`);

    if (!res.ok) {
        return <div className="alert alert-danger">Ticket not found.</div>;
    }

    const ticket = await res.json();    

    if (!ticket) return;
    return <TicketDetail ticket={ticket} />;
}