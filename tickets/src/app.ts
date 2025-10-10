import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler, NotFoundError } from '@apkmstickets/common';

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

app.use(async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };