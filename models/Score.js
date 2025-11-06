import mongoose from 'mongoose';
const { Schema } = mongoose;

const scoreSchema = new Schema({
  name: { type: String, default: "Guest"},        // Player name
  moves: Number,       // Number of moves to finish
  date: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model('Score', scoreSchema);
