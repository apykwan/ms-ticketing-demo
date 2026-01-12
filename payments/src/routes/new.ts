import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';
import { stripe } from '@/stripeSetup';

import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus
} from '@apkmstickets/common';
import { Order } from '@/models/order';
import { Payment } from '@/models/payment';
import { PaymentCreatedPublisher } from '@/events/publishers/payment-created-publisher';
import { natsWrapper } from '@/nats-wrapper';

const router = express.Router();

router.post('/api/payments', 
    requireAuth,
    [
        body('orderId').not().isEmpty()
    ],
    validateRequest,     
    async (req: Request, res: Response) => {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) throw new NotFoundError();

        if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

        if (order.status === OrderStatus.Cancelled) throw new BadRequestError('Cannot pay for an cancelled order');

        try {
            const charge = await stripe.paymentIntents.create({
                amount: Math.round(order.price * 100),
                currency: 'usd'
            });

            const payment = Payment.build({
                orderId,
                stripeId: charge.id
            });
            await payment.save();
            
            await new PaymentCreatedPublisher(natsWrapper.client).publish({
                id: payment.id,
                orderId: payment.orderId,
                stripeId: payment.stripeId
            });

            res.status(201).send({ 
                success: true, 
                id: payment.id, 
                stripeId: payment.stripeId,
                client_secret: charge.client_secret
            });
        } catch (err: any) {
            console.error('Stripe payment failed', err.message);
            res.status(400).send({ success: false });
        }
    }
);

export { router as createChargeRouter };