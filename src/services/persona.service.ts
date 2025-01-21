import { Persona } from "../models";
import {
  deletePersonaRepository,
  getPersonaByIdRepository,
  getPersonaByNombreRepository,
  getPersonasRepository,
  setPersonaRepository,
  updatePersonaRepository,
} from "../repository";
export const getPersonasService = async () => {
  return await getPersonasRepository();
};
export const getPersonaByIdService = async (id: string) => {
  return await getPersonaByIdRepository(id);
};
export const getPersonaByNombreService = async (nombre: string) => {
  return await getPersonaByNombreRepository(nombre);
};
export const setPersonaService = async (persona: Persona) => {
  return await setPersonaRepository(persona);
};
export const updatePersonaService = async (persona: Persona) => {
  return await updatePersonaRepository(persona);
};
export const deletePersonaServite = async (userId: string) => {
  return await deletePersonaRepository(userId);
};
