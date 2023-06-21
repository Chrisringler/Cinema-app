import express from 'express';
import moviesRoutes from './routes/movies.routes.js';
import { PORT } from '../config.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({ origin: 'https://relaxed-salmiakki-cfb776.netlify.app' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://relaxed-salmiakki-cfb776.netlify.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(moviesRoutes);

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
