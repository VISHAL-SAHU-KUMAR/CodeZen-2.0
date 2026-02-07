const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/agripredict360';
    console.log(`Connecting to: ${mongoURI}`);

    // Set bufferCommands to false to fail immediately if not connected
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Backend will continue, but DB operations will fail until MongoDB is connected.');
  }
};

module.exports = connectDB;
