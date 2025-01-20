import { pool } from "../config";
import {
  DetallesPersona,
  Persona,
  PersonaMysql,
  PersonaResult,
} from "../models";
import { PersonaDetallesResults } from "../models/PersonaDetalles";

const promise = pool.promise();

export const getPersonasRepository = async () => {
  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT * FROM personas;`,
      []
    );
    console.log("PersonaRepository - GetPersonas()");
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};
export const getPersonaByIdRepository = async (id: string) => {
  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT * FROM personas where personas.id=?;`,
      [id]
    );
    console.log("PersonaRepository - GetPersonaById()");
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};
export const getPersonaByNombreRepository = async (nombre: string) => {
  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT * FROM crudpersonasapp_personasdb1.personas where nombre like ?`,
      [`%${nombre}%`]
    );
    console.log("PersonaRepository - GetPersonaByNombre()");
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};
export const setPersonaDetalleRepository = async (
  detallePersona: DetallesPersona
) => {
  const {
    comuna,
    direccion,
    email,
    estado_cv,
    id,
    provincia,
    region,
    telefono,
  } = detallePersona;
  try {
    console.log("PersonaRepository - setPersonaDetalleRepository()");
    const [rows] = await promise.query<PersonaDetallesResults>(
      `INSERT INTO detalles_personas VALUES(?,?,?,?,?,?,?,?);`,
      [id, direccion, telefono, estado_cv, region, comuna, provincia, email]
    );

    return rows.affectedRows > 0 ? { idDetalle: id } : rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};
export const setPersonaRepository = async (persona: Persona) => {
  const {
    amaterno,
    apaterno,
    dv,
    fec_nac,
    id,
    id_detalle,
    nacionalidad,
    nombre,
    rut,
    sexo,
  } = persona;
  try {
    const [rows] = await promise.query<PersonaResult>(
      `INSERT INTO personas VALUES(?,?,?,?,?,?,?,?,?,?);`,
      [
        id,
        rut,
        dv,
        nombre,
        apaterno,
        amaterno,
        fec_nac,
        sexo,
        nacionalidad,
        id_detalle,
      ]
    );

    console.log("PersonaRepository - setPersonaRepository()");
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};
