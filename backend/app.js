import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import auth from './routes/user.route.js';
const app = express();
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use('/api/v1/auth', auth);
export default app;
