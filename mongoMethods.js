import mongoose from "mongoose";
import { AuthData } from "./mongoDB.js";

const uri =
  "mongodb+srv://ishu:lNwKH7FlCS8wwZBx@cluster0.bbugwp2.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    mongoose.connect(uri);
    console.log(`Database Connected`);
  } catch (err) {
    console.error(`Error connecting database ${err}`);
  }
}

async function closeConnection() {
  try {
    mongoose.connection.close();
    console.error(`Connection closed.`);
  } catch (err) {
    console.error(`Error in closing connection ${err}`);
  }
}

async function register(data) {
  try {
    const user = new AuthData(data);
    const result = await user.save();
    console.log(`New user Registered ${data}`);
  } catch (err) {
    console.error(`Error in registering new user ${err}`);
    return false;
  }
}

async function findUser(data) {
  try {
    const user = await AuthData.findOne({ username: data.username });
    if (user) return user;
    return null;
  } catch (err) {
    console.log(`Error in logging ${err}`);
  }
}

export { connect, closeConnection, register, findUser };
