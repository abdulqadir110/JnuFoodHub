const mongoose = require("mongoose");
const initDataUser = require("./data.js");
const initDataShop = require("./shopData.js");
const User = require("../models/user.js");
const Shop = require("../models/canteen.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/jnufoodhub";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
}

const initDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(initDataUser.data);

    await Shop.deleteMany({});
    await Shop.insertMany(initDataShop.data);

    console.log("Data was initialized");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

main().then(initDB);
