import mongoose from 'mongoose'

async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB");
    
  }catch(error){
    console.error('error connecting to db',error)
  }
}

export default connectDB