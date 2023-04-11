import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'express-async-errors';
import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// sec pkgs
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

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

const __dirname = dirname(fileURLToPath(import.meta.url));

// serving front end
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
// json body parser
// app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

// maybe not needed - but to make sure any request that doesn't go to api goes to index.html -> and from their react router will take the lead
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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
