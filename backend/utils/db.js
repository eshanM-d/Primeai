const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    try {
      // Try local database with a short timeout
      const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (localDbError) {
      console.log('Local MongoDB not detected. Starting automated In-Memory Database for testing...');
      const mongoServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoServer.getUri();
      const conn = await mongoose.connect(inMemoryUri);
      console.log(`MongoDB In-Memory Server Connected automatically at ${inMemoryUri}`);
    }
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
