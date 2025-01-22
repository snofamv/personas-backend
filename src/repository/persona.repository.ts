import { pool } from "../config";
import { Persona, PersonaMysql, PersonaResult } from "../models";

const promise = pool.promise();
const handleError = (err: any, functionName: string) => {
  console.error(`ERROR EN ${functionName}: => `, err);
  throw err;
};

export const getPersonasRepository = async () => {
  const BASE_SELECT_QUERY = `SELECT * FROM personas WHERE activo = 1`;
  try {
    const [rows] = await promise.query<PersonaMysql[]>(BASE_SELECT_QUERY);
    return rows;
  } catch (err) {
    handleError(err, "getPersonasRepository");
  }
};

export const getPersonaByIdRepository = async (id: string) => {
  if (!id) {
    throw new Error("El parámetro 'id' es obligatorio.");
  }

  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT id, nombre, apaterno, amaterno, rut, dv, estado_cv, activo, nacionalidad, sexo, DATE_FORMAT(fec_nac, '%Y-%m-%d') AS fec_nac FROM personas WHERE rut = ? AND activo = 1;`,
      [id]
    );
    return rows;
  } catch (err) {
    handleError(err, "getPersonaByIdRepository");
  }
};

export const getPersonaByNombreRepository = async (nombre: string) => {
  if (!nombre || nombre.trim().length === 0) {
    throw new Error(
      "El parámetro 'nombre' es obligatorio y no puede estar vacío."
    );
  }
  try {
    const [rows] = await promise.query<PersonaMysql[]>(
      `SELECT * FROM crudpersonasapp_personasdb1.personas WHERE nombre LIKE ?`,
      [`%${nombre}%`]
    );
    return rows;
  } catch (err) {
    handleError(err, "getPersonaByNombreRepository");
  }
};

export const updatePersonaRepository = async (persona: Persona) => {
  const connection = await promise.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query<PersonaResult>(
      `UPDATE personas SET rut = ?, dv = ?, nombre = ?, apaterno = ?, amaterno = ?, fec_nac = ?, sexo = ?, nacionalidad = ?, activo = ?, estado_cv = ? WHERE id = ?;`,
      [
        persona.rut,
        persona.dv,
        persona.nombre,
        persona.apaterno,
        persona.amaterno,
        persona.fec_nac,
        persona.sexo,
        persona.nacionalidad,
        persona.activo,
        persona.estado_cv,
        persona.id,
      ]
    );
    await connection.commit();
    return {
      success: rows.affectedRows > 0,
      message: rows.affectedRows > 0 ? "Success" : "Failed",
    };
  } catch (err) {
    await connection.rollback();
    handleError(err, "updatePersonaRepository");
  } finally {
    connection.release();
  }
};

export const setPersonaRepository = async (persona: Persona) => {
  try {
    const [rows] = await promise.query<PersonaResult>(
      `INSERT INTO personas VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        persona.id,
        persona.rut,
        persona.dv,
        persona.nombre,
        persona.apaterno,
        persona.amaterno,
        persona.fec_nac,
        persona.sexo,
        persona.nacionalidad,
        persona.activo === 0 ? false : true,
        persona.estado_cv,
      ]
    );
    return { success: true, rows };
  } catch (err: any) {
    handleError(err, "setPersonaRepository");
    return { success: false, error: err.code };
  }
};

export const deletePersonaRepository = async (userId: string) => {
  try {
    const [result] = await promise.query<PersonaResult>(
      `DELETE FROM personas WHERE id = ?;`,
      [userId]
    );
    return { status: result.affectedRows > 0 ? true : false };
  } catch (err) {
    handleError(err, "deletePersonaRepository");
  }
};
