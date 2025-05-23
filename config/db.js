const mongoose = require('mongoose');

const connectDB = async () => {
      const MONGO_URI = process.env.MONGO_URI
    try {
        await mongoose.connect(`${MONGO_URI}`);
        console.log('Database connected successfully');

    } catch (error) {
        console.log('error connecting database' , error.message);
    }
};

module.exports = connectDB;