import express, { type Request, type Response } from 'express';
import { requireAuth } from '@apkmstickets/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };