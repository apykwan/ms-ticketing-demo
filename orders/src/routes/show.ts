import express, { type Request, type Response } from 'express';
import { 
    requireAuth, 
    NotAuthorizedError, 
    NotFoundError, 
} from '@apkmstickets/common';

import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
    const order = await Order
        .findById(req.params.orderId)
        .populate('ticket');
    
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    res.status(200).send(order);
});

export { router as showOrderRouter };