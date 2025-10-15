import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { NotFoundError, validateRequest, requireAuth, NotAuthorizedError } from '@apkmstickets/common';

import { Ticket } from '@/models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', 
  requireAuth,  
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };