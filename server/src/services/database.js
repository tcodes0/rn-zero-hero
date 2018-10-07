/* eslint-disable no-console */
import mongoose from "mongoose";

const dbAddress = {
  production:
    "mongodb+srv://user:bEHp24AVrfijnMbw@rtr-cluster-pgojw.mongodb.net/main?retryWrites=true",
  development: "mongodb://localhost:27017/test2"
};

mongoose.connect(
  dbAddress.production,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", () => {
  console.log("database connection error");
});
