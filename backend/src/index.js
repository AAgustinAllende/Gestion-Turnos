import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/turnero.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json()); 

app.use('/api', apiRoutes); 



app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto', process.env.PORT || 3000);
});
