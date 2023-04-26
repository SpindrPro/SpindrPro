const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  spotify_id: {type: String, required: true, unique: true, dropDups: true},
  genre: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  albumName: { type: String, required: true },
  preview: { type: String, required: true },
});

module.exports = mongoose.model("Track", trackSchema);
