const mongooose = require("mongoose");
const Schema = mongoose.Schema;
const Track = require("./trackModel");

const genreSchema = new Schema({
  name: { type: String, required: true },
  tracks: [
    {
      type: Schema.Type.ObjectId,
      ref: Track,
    },
  ],
});

module.exports = mongoose.mode("Genre", genreSchema);
