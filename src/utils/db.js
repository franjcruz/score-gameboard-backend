import logger from './logger';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true },
  err => {
    if (err) {
      logger.info('Unable to connect to database.');
      process.exit(1);
    }
    logger.info('Connected to database.');
  }
);

export default mongoose;
