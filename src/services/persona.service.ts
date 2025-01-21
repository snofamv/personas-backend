import { DetallesPersona, Persona, PersonaMysql } from "../models";
import {
  deletePersonaRepository,
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
export const deletePersonaServite = async (userId: string) => {
  const result = await deletePersonaRepository(userId);
  const isDeleted =
    result?.affectedRows! > 0 && result?.changedRows! > 0 ? true : false;
  return isDeleted
    ? { status: 200, message: "Success" }
    : { status: 400, message: "Fail" };
};
