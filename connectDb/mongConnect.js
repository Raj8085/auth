const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://patelrajeev10342:IjF9uRRJJJkisQzZ@authcluster.apnpr.mongodb.net/?retryWrites=true&w=majority&appName=authCluster"

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;