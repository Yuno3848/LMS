import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import auth from './routes/user.route.js';
import morgan from 'morgan';
import studentProfile from './routes/studentProfile.route.js';
import instructor from './routes/instructorProfile.route.js';
import course from './routes/course.route.js';
import admin from './routes/admin.route.js';

import itemSection from './routes/itemSection.route.js';
import transaction from './routes/transaction.route.js';
import enrollment from './routes/enrollment.route.js';
import subItem from './routes/subItem.route.js';

const app = express();
app.use(morgan('dev'));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigin = [process.env.FRONTEND_URL, 'http://127.0.0.1:5500'];
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use('/api/v1/auth', auth);
app.use('/api/v1/studentProfile', studentProfile);
app.use('/api/v1/instructorProfile', instructor);
app.use('/api/v1/course', course);
app.use('/api/v1/admin', admin);

app.use('/api/v1/itemSection', itemSection);
app.use('/api/v1/transaction', transaction);
app.use('/api/v1/enrollment', enrollment);
app.use('/api/v1/subItem', subItem);

export default app;
