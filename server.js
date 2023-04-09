import 'express-async-errors';
import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// requests log - dev only
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// json body parser
// app.use(cors());
app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.json('Welcome');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is Listening on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
