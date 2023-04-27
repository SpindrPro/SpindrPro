const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Track = require("./trackModel");

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true, dropDups: true},
  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: Track,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);