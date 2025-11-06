import express from 'express';
import Score from '../models/Score.js';
const router = express.Router();

// Get all scores   
router.get('/scores', async (req, res) => {
    try {
        const scores = await Score.find().sort({ moves: 1, date: 1 }).limit(10); // Top 10 scores sorted by moves and date
        res.json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/score', async (req, res) => {
    const { name, moves } = req.body;

    if (!name || typeof moves !== 'number') {
        return res.status(400).json({ message: 'Invalid data' });
    }

    const newScore = new Score({ name, moves });

    try {
        const savedScore = await newScore.save();  // save once
        res.status(201).json(savedScore);          // send response once
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
// 5. Frontend calls `POST /score` with { name, moves } when game ends
// 6. Backend saves score to MongoDB
// 7. Frontend optionally calls `GET /scores` → gets global leaderboard → updates DOM.  
router.delete('/scores', async (req, res) => {
  try {
    await Score.deleteMany({});
    res.json({ message: 'All scores cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
