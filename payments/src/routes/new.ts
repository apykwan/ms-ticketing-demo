import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';

import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError
} from '@apkmstickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments', 
    requireAuth,
    [
        body('token').not().isEmpty(),
        body('orderId').not().isEmpty()
    ],
    validateRequest,     
    async (req: Request, res: Response) => {
        console.log('payment created');
        res.send({ success: true });
    }
);

export { router as createChargeRouter };