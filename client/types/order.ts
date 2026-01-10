import { Ticket } from './ticket';

export interface Order {
    id: string;
    userId: string; 
    status: string; 
    expiresAt: string; 
    ticket: Ticket, 
    version: number;
}