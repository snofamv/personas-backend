import express, { Router } from "express";
import {
  getPersonas,
  getPersonaById,
  getPersonaByNombre,
  setPersona,
  setPersonaDetalles,
  patchPersonaById,
  patchPersonaDetalleById,
  deletePersonById,
} from "../controllers/persona.controller";

const personasRoutes: Router = express.Router();

// Instancia del controlador

// Usa la referencia al método sin ejecutarlo
personasRoutes.get("/", getPersonas);
personasRoutes.get("/id/:id", getPersonaById);
personasRoutes.get("/nombre/:nombre", getPersonaByNombre);
personasRoutes.delete("/eliminar/:id", deletePersonById);
personasRoutes.post("/agregar", setPersona);
personasRoutes.post("/detalle", setPersonaDetalles);
personasRoutes.patch("/detalle/:idDetalle", patchPersonaDetalleById);
personasRoutes.patch("/:idPersona", patchPersonaById);

export default personasRoutes;
