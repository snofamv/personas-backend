import { Request, response, Response } from "express";
import { Persona } from "../models";
import { v4 as uuidv4 } from "uuid";
import {
  deletePersonaServite,
  getPersonaByIdService,
  getPersonaByNombreService,
  getPersonasService,
  setPersonaService,
  updatePersonaService,
} from "../services";
import { ResponseType } from "../types/ResponseType";
export const deletePersonById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const resultado = await deletePersonaServite(id);
  if (id.toString().trim().length !== 36)
    return res.status(200).json({ status: 200, message: "ID Invalido" });

  if (resultado?.affectedRows === 0)
    return res.status(200).json({ status: 200, message: "No existe ID" });

  if (resultado?.changedRows === 0)
    return res
      .status(200)
      .json({ status: 200, message: "Usuario ya se encuentra eliminado." });

  return res.status(200).json({ status: 200, message: "Usuario eliminado" });
};

export const patchPersonaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id: idPersona } = req.params;
  const {
    nombre,
    amaterno,
    apaterno,
    fec_nac,
    rut,
    dv,
    sexo,
    nacionalidad,
    activo,
    estado_cv,
  } = req.body;
  const personaActualizada: Persona = {
    id: idPersona,
    amaterno,
    apaterno,
    nombre,
    fec_nac,
    rut,
    dv,
    sexo,
    nacionalidad,
    activo,
    estado_cv,
  } as Persona;
  try {
    const resultado = await updatePersonaService(personaActualizada); // Llamada única al servicio
    return res.status(200).json({ status: 200, message: resultado }); // Enviar la respuesta sin retorno
  } catch (error) {
    console.error("Error fetching personas:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPersonas = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const resultado = await getPersonasService();
    if (resultado?.length === 0)
      return res.status(200).json({ status: 200, message: [] });
    return res.status(200).json({ status: 200, message: resultado });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPersonaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  // DESESCTRUCTURAR VALORES
  const { id } = req.params;
  if (id.trim().length < 7 || !id) {
    return res.status(200).json({ status: 200, message: "ID Invalido" });
  }
  try {
    const resultado = await getPersonaByIdService(id);
    return res.status(200).json({ status: 200, message: resultado });
  } catch (error) {
    console.error("Error fetching persona por ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPersonaByNombre = async (
  req: Request,
  res: Response
): Promise<any> => {
  // DESESCTRUCTURAR VALORES
  const { nombre } = req.params;
  if (nombre.trim().length < 1 || !nombre.trim()) {
    return res
      .status(200)
      .json({ status: 200, message: "Parametro 'Nombre' Incorrecto." });
  }
  try {
    const resultado = await getPersonaByNombreService(nombre);
    if (resultado?.length === 0)
      return res
        .status(200)
        .json({ status: 200, message: "No existen resultados" });
    return res.status(200).json({ status: 200, message: resultado });
  } catch (error) {
    console.error("Error fetching persona por nombre:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const setPersona = async (req: Request, res: Response): Promise<any> => {
  const { idDetalle } = req.params;
  // DESESCTRUCTURAR VALORES
  const {
    nombre,
    amaterno,
    apaterno,
    fec_nac,
    rut,
    dv,
    sexo,
    nacionalidad,
    estado_cv,
  } = req.body;
  const persona: Persona = {
    id: uuidv4(),
    amaterno,
    apaterno,
    dv,
    rut,
    sexo,
    fec_nac,
    nacionalidad,
    nombre,
    activo: 0,
    estado_cv,
  };

  const resultado: ResponseType = await setPersonaService(persona);
  if (resultado.message === "ER_DUP_ENTRY") {
    return res.status(409).json("Rut ingresado ya existe.");
  }

  return res
    .status(200)
    .json({ status: 200, message: "Persona agregada correctamente" });
};
