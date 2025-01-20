import express, { Router } from "express";
import {
  getPersonas,
  getPersonaById,
  getPersonaByNombre,
  setPersona,
  setPersonaDetalles,
} from "../controllers/persona.controller";

const personasRoutes: Router = express.Router();

// Instancia del controlador

// Usa la referencia al método sin ejecutarlo
personasRoutes.get("/", getPersonas);
personasRoutes.get("/id/:id", getPersonaById);
personasRoutes.get("/nombre/:nombre", getPersonaByNombre);
personasRoutes.post("/agregar", setPersona);
personasRoutes.post("/detalle", setPersonaDetalles);

export default personasRoutes;
