import { DetallesPersona, Persona, PersonaMysql } from "../models";
import {
  getPersonaByIdRepository,
  getPersonaByNombreRepository,
  getPersonasRepository,
  setPersonaDetalleRepository,
  setPersonaRepository,
  updatePersonaDetalleRepository,
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

export const setPersonaDetalleService = async (
  detallePersona: DetallesPersona
) => {
  return await setPersonaDetalleRepository(detallePersona);
};
export const updatePersonaService = async (persona: Persona) => {
  return await updatePersonaRepository(persona);
};
export const updatePersonaDetalleService = async (detalle: DetallesPersona) => {
  return await updatePersonaDetalleRepository(detalle);
};
