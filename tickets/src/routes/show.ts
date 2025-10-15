import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { NotFoundError } from '@apkmstickets/common';

import { Ticket } from '@/models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new NotFoundError();
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) throw new NotFoundError();
  res.status(201).send(ticket);
});

export { router as showTicketRouter };