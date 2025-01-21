const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  watchDate: { type: Date, required: true },
  lastEpisode: { type: String, required: true },
  status: { type: String, required: true },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Item', ItemSchema);
