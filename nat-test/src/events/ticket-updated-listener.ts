import { type Message } from 'node-nats-streaming';

import { Listener } from './base-listener';
import { TicketUpdatedEvent } from './ticket-updated-event';
import { Subjects } from './subjects';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = 'payments-service';
 
  onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    console.log('Event data!', data);
    msg.ack();
  } 
}