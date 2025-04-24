import { Router } from "express";
import { getTurnos, getTurnoById, createTurno, updateTurno, deleteTurno } from "../controllers/turnero.controllers.js";

const router = Router()

router.get('/turnos', getTurnos)

router.get('/turnos/:id', getTurnoById)

router.post('/turnos', createTurno)

router.put('/turnos/:id', updateTurno)

router.delete('/turnos/:id', deleteTurno)

export default router