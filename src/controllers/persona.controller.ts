import { Request, response, Response } from "express";
import { DetallesPersona, Persona } from "../models";
import { v4 as uuidv4 } from "uuid";
import {
  deletePersonaServite,
  getPersonaByIdService,
  getPersonaByNombreService,
  getPersonasService,
  setPersonaDetalleService,
  setPersonaService,
  updatePersonaDetalleService,
  updatePersonaService,
} from "../services";
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
export const patchPersonaDetalleById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { idDetalle } = req.params; // ID A BUSCAR
  const {
    comuna,
    direccion,
    email,
    estado_cv,
    provincia,
    region,
    telefono,
  }: DetallesPersona = req.body; // NUEVO DETALLE
  const nuevoDetalle = {
    id: idDetalle,
    comuna,
    direccion,
    email,
    estado_cv,
    provincia,
    region,
    telefono,
  } as DetallesPersona;

  try {
    const resultado = await updatePersonaDetalleService(nuevoDetalle);
    return res.status(200).json({ status: 200, message: resultado }); // Enviar la respuesta sin retorno
  } catch (error) {
    console.error("Error fetching personas:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const patchPersonaById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { idPersona } = req.params;
  const { nombre, amaterno, apaterno, fec_nac, rut, dv, sexo, nacionalidad } =
    req.body;
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
  if (id.trim().length !== 36 || !id) {
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
export const setPersonaDetalles = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { direccion, telefono, estado_cv, region, comuna, provincia, email } =
    req.body;
  const detallePersona: DetallesPersona = {
    id: uuidv4(),
    direccion,
    email,
    telefono,
    provincia,
    region,
    comuna,
    estado_cv,
  };

  try {
    const resultado = await setPersonaDetalleService(detallePersona);
    return res.status(200).json({ status: 200, message: resultado });
  } catch (error) {
    console.error("Error al agregar personas:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const setPersona = async (req: Request, res: Response): Promise<any> => {
  const { idDetalle } = req.params;
  // DESESCTRUCTURAR VALORES
  const { nombre, amaterno, apaterno, fec_nac, rut, dv, sexo, nacionalidad } =
    req.body;
  const persona: Persona = {
    id: uuidv4(),
    id_detalle: idDetalle,
    amaterno,
    apaterno,
    dv,
    rut,
    sexo,
    fec_nac,
    nacionalidad,
    nombre,
    activo: false,
  };
  try {
    const resultado = await setPersonaService(persona);
    return res.status(200).json({ status: 200, message: resultado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// EXAMPLE PERSONA
// {
//   "nombre": "nombrePrueba",
//   "apaterno": "apellidoPrueba",
//   "amaterno": "apellido2Prueba",
//   "fec_nac": "2024-05-2024",
//   "rut": "11111111",
//   "dv": "1",
//   "sexo": "M",
//   "nacionalidad": "chileno"
// }

// EXAMPLE DETALLE
// {
//   "direccion": "direccion de prueba #332, los alerces.",
//   "telefono": "1111111111",
//   "estado_cv": 1,
//   "region": 5,
//   "comuna": 2,
//   "provincia": 1,
//   "email": "testEmail@gmail.com"
// }
