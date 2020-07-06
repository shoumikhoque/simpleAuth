const mongoose = require("mongoose");
const { model } = require("./Vehicles");
const schema = mongoose.Schema;
// const sha256=require('crypto-js/sha256')

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports=User=mongoose.model('User',UserSchema);
