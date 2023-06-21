import express from 'express';
import moviesRoutes from './routes/movies.routes.js';
import { PORT } from '../config.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(moviesRoutes);

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
