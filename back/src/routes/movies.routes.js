import { Router } from 'express';
import multer from 'multer';
import {
  getListMovies,
  createListMovie,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movies.controllers.js';
import {login} from "../controllers/login.controller.js"
import {registerUser} from "../controllers/register.controller.js"
import {authenticateJWT} from "../controllers/tokens.js"
const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/movies/upload', upload.single('file'), authenticateJWT, createListMovie);

router.get('/movies',authenticateJWT, getListMovies);

router.post('/movies',authenticateJWT, createMovie);

router.get('/movies/:id',authenticateJWT, getMovie);

router.put('/movies/:id',authenticateJWT, updateMovie)

router.delete('/movies/:id',authenticateJWT, deleteMovie);

router.post('/login', login);

router.post('/register', registerUser)

export default router;
