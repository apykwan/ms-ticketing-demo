import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler, NotFoundError, currentUser } from '@apkmstickets/common';

import { indexOrderRouter } from '@/routes';
import { createOrderRouter } from '@/routes/new';
import { showOrderRouter } from '@/routes/show';
import { deleteOrderRouter } from '@/routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production'
  })
);
app.use(cors());

app.use(currentUser);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);

app.all(/.*/, async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };