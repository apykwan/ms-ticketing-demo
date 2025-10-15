import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler, NotFoundError, currentUser } from '@apkmstickets/common';

import { indexTicketRouter } from '@/routes';
import { createTicketRouter } from '@/routes/new';
import { showTicketRouter } from '@/routes/show';
import { updateTicketRouter } from '@/routes/update';

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
app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all(/.*/, async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };