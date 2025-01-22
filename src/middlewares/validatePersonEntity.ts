import { NextFunction, Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { Persona } from "../models";

export const validatePersonEntity = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const requestBody = req.body;
  const ajv = new Ajv();
  console.log(requestBody);

  // Esquema ajustado
  const schema: JSONSchemaType<Persona> = {
    type: "object",
    properties: {
      id: { type: "string", minLength: 0, maxLength: 36, nullable: true }, // Ajuste para que sea opcional
      rut: { type: "string", minLength: 7, maxLength: 8 },
      dv: { type: "string", minLength: 1, maxLength: 1 },
      nombre: { type: "string", minLength: 3, maxLength: 32 },
      apaterno: { type: "string", minLength: 3, maxLength: 32 },
      amaterno: { type: "string", minLength: 3, maxLength: 32 },
      fec_nac: { type: "string", minLength: 10, maxLength: 10 },
      sexo: { type: "string", enum: ["M", "F", "N", "D"] },
      nacionalidad: { type: "string", minLength: 2, maxLength: 32 },
      activo: { type: "number" },
      estado_cv: { type: "number", enum: [1, 2, 3, 4] },
    },
    required: [
      "rut",
      "dv",
      "nombre",
      "apaterno",
      "amaterno",
      "fec_nac",
      "sexo",
      "nacionalidad",
      "estado_cv",
    ], // No incluimos "id" en la lista de required
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(requestBody);
  if (!valid) {
    console.warn(validate.errors);
    return res.status(400).json({
      status: 400,
      message: `El campo [ ${validate
        .errors![0].instancePath.split("/")[1]
        .trim()} ] ${validate.errors![0].message}  - [${
        validate.errors![0].params && JSON.stringify(validate.errors![0].params)
      }]`,
    });
  }
  next();
};
