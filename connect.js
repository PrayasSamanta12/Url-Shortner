const mongoose = require("mongoose");
//This configuration setting in Mongoose is used to enforce strict mode for queries
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
