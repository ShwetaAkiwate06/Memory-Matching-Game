import express from 'express';
import mongoose from 'mongoose';
import scoreRoutes from './routes/scoreRoutes.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', scoreRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

