import mongoose from "mongoose";

mongoose.set("strictQuery",false)
// mongoose
//   .connect(
//     "mongodb+srv://testCoder:testCoder@databases.wjmpl.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Database connected"))
//   .catch(() => "Error during database connection");

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/?authSource=admin`)
  .then(() => {
    console.log("Succesfully connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });

