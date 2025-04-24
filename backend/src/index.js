import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routerTurnos from './routes/turnos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Rutas API
app.use('/api', routerTurnos);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
