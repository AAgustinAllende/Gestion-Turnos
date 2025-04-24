import cors from 'cors'
import express from 'express';
import turnosRoutes from './routes/turnero.routes.js';
import config from './config.js';

const app = express();

app.set('port', config.port)

// Middleware para usar las rutas
app.use(cors())
app.use(express.json())
app.use(turnosRoutes); 

export default app;
