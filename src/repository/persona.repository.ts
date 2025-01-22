import { pool } from "../config";
import { Persona, PersonaMysql, PersonaResult } from "../models";

const promise = pool.promise();

export const getPersonasRepository = async () => {
  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT * FROM personas;`
    );
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
      `SELECT id, nombre, apaterno, amaterno, rut, dv, estado_cv, activo, nacionalidad, sexo, DATE_FORMAT(fec_nac, '%Y-%m-%d') AS fec_nac FROM personas where personas.rut=?;`,
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
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA REPOSITORY: => ", err);
      throw err;
    }
  }
};

export const updatePersonaRepository = async (persona: Persona) => {
  const {
    amaterno,
    apaterno,
    dv,
    fec_nac,
    id,
    nacionalidad,
    nombre,
    rut,
    sexo,
    activo,
    estado_cv,
  } = persona;
  console.log(persona);
  try {
    const [rows] = await promise.query<PersonaResult>(
      `UPDATE personas set rut = ?, dv = ?, nombre = ?, apaterno = ?, amaterno = ?, fec_nac = ?, sexo = ?, nacionalidad = ?, activo = ?, estado_cv = ? where id = ?;`,
      [
        rut,
        dv,
        nombre,
        apaterno,
        amaterno,
        fec_nac,
        sexo,
        nacionalidad,
        activo,
        estado_cv,
        id,
      ]
    );
    return rows.affectedRows > 0 ? "Success" : "Failed";
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
    nacionalidad,
    nombre,
    rut,
    sexo,
    activo,
    estado_cv,
  } = persona;
  try {
    const [rows] = await promise.query<PersonaResult | any>(
      `INSERT INTO personas VALUES (?,?,?,?,?,?,?,?,?,?, ?);`,
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
        activo === 0 ? false : true,
        estado_cv,
      ]
    );

    return { status: 500, message: rows };
  } catch (err: any) {
    return { status: 500, message: err.code };
  }
};

export const deletePersonaRepository = async (userId: string) => {
  try {
    const [rows] = await promise.query<PersonaResult>(
      `UPDATE personas set activo = 0 WHERE personas.id=?;`,
      [userId]
    );
    return rows;
  } catch (err) {
    if (err) {
      console.error("ERROR EN PERSONA deletePersonaRepository(): => ", err);
      throw err;
    }
  }
};
