import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import notesRoutes from './routes/notes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', notesRoutes);

app.use((_req, _res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let errorMessage = 'Internal Server Error';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    code: statusCode,
    message: errorMessage,
  });
});

export default app;
