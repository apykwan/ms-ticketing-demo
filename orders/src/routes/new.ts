import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@apkmstickets/common';

const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .withMessage('TicketId must be provided')
], async (req: Request, res: Response) => {
    res.send({});
});

export { router as createOrderRouter };