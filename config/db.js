import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log('Connection to the database successfully');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;
