import mongoose from 'mongoose';

const boardgameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  entryDate: { type: Date, default: Date.now }
});

export default mongoose.model('boardgame', boardgameSchema);
