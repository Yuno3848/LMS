import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import auth from './routes/user.route.js';
import morgan from 'morgan';
import studentProfile from './routes/studentProfile.route.js';
import instructor from './routes/instructorProfile.route.js';
import course from './routes/course.route.js';
import admin from './routes/admin.route.js';

const app = express();
app.use(morgan('dev'));
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
app.use('/api/v1/studentProfile', studentProfile);
app.use('/api/v1/instructorProfile', instructor);
app.use('/api/v1/course', course);
app.use('/api/v1/admin',admin)
export default app;
