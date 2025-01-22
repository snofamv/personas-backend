import express, { Router } from "express";
import {
  getPersonas,
  getPersonaById,
  getPersonaByNombre,
  setPersona,
  patchPersonaById,
  deletePersonById,
} from "../controllers/persona.controller";
import {
  validateId,
  validatePersonId,
  validateName,
  validatePersonEntity,
} from "../middlewares";

const personasRoutes: Router = express.Router();

// Instancia del controlador

// Usa la referencia al método sin ejecutarlo
personasRoutes.get("/", getPersonas);
personasRoutes.get("/id/:id", validateId, getPersonaById);
personasRoutes.get("/nombre/:nombre", validateName, getPersonaByNombre);
personasRoutes.delete("/eliminar/:id", validatePersonId, deletePersonById);
personasRoutes.post("/agregar", validatePersonEntity, setPersona);
personasRoutes.patch("/actualizar/:id", validatePersonId, patchPersonaById);

export default personasRoutes;
