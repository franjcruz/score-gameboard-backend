import logger from './logger';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = async () => {
  try {
    await mongoose.connect(
      process.env.config.MONGO_HOST,
      { useMongoClient: true }
    );
  } catch (err) {
    logger.info(err);
  }
};

export default db;
