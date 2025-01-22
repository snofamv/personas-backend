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
export const deletePersonById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (id.toString().trim().length !== 36) {
    res.statusCode = 400;
    return res.json({ status: false, message: "Parametro ID Invalido" });
  }

  const resultado = await deletePersonaServite(id);

  if (!resultado?.status) {
    res.statusCode = 400;
    return res.json({ status: false, message: "No existe ID" });
  }
  res.statusCode = 200;
  return res.json({ status: true, message: "Usuario eliminado" });
};

// response fixed
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
    if (!resultado?.success) {
      res.statusCode = 400;
      return res.json({
        status: true,
        message: resultado?.message,
      });
    }
    res.statusCode = 200;
    return res.json({
      status: true,
      message: "Persona eliminada correctamente.",
    });
  } catch (error) {
    res.statusCode = 500;
    console.error("Error fetching personas:", error);
    return res.json({ message: "Internal Server Error" });
  }
};

// Response Fixed

export const getPersonas = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const resultado = await getPersonasService();
    if (resultado?.length === 0) {
      res.statusCode = 200; //No content found
      return res.json({ status: false, message: [] });
    }
    res.statusCode = 200;
    return res.json({ status: true, message: resultado });
  } catch (error) {
    console.error("Error fetching personas:", error);
    res.statusCode = 500;
    return res.json({ status: false, message: "Internal Server Error" });
  }
};
// Response Fixed

export const getPersonaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (id.trim().length < 7 || !id) {
    res.statusCode = 400; //Bad request
    return res.json({ status: false, message: "ID Invalido" });
  }
  try {
    const resultado = await getPersonaByIdService(id);
    res.statusCode = 200;
    return res.json({ status: true, message: resultado });
  } catch (error) {
    console.error("Error fetching persona por ID:", error);
    res.statusCode = 500;
    return res.json({ status: false, message: "Internal Server Error" });
  }
};
// Response Fixed

export const getPersonaByNombre = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { nombre } = req.params;
  if (nombre.trim().length < 1 || !nombre.trim()) {
    res.statusCode = 400; //Bad request
    return res.json({ message: "Parametro 'Nombre' Incorrecto." });
  }
  try {
    const resultado = await getPersonaByNombreService(nombre);
    if (resultado?.length === 0) {
      res.statusCode = 404; // Not found
      return res.json({ status: false, message: "No existen resultados" });
    }
    res.statusCode = 200;
    return res.json({ status: true, message: resultado });
  } catch (error) {
    console.error("Error fetching persona por nombre:", error);
    res.statusCode = 500;
    return res.json({ status: false, message: "Internal Server Error" });
  }
};

// Response Fixed
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
    activo: 1,
    estado_cv,
  };

  const resultado = await setPersonaService(persona);
  if (!resultado.success) {
    res.statusCode = 409;
    return res.json({ status: false, message: "Error al ingresar el rut." });
  }
  res.statusCode = 200;
  return res.json({ status: true, message: "Persona agregada correctamente" });
};
