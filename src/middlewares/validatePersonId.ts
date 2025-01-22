import { NextFunction, Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";

export const validatePersonId = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { id } = req.params;
  const ajv = new Ajv();

  // Esquema para validar que el parámetro 'id' es un string no vacío
  const schema: JSONSchemaType<string> = {
    type: "string",
    minLength: 36, // Asegura que no esté vacío
    maxLength: 36,
    pattern: "^[a-zA-Z0-9-]+$", // Si deseas validar un formato específico para el ID (por ejemplo, solo alfanumérico)
  };

  const validate = ajv.compile(schema);
  const valid = validate(id);

  if (!valid) {
    console.warn(validate.errors);
    return res.status(400).json({
      status: 400,
      message: `Parametro Nombre: ${validate.errors![0].message}`,
    });
  }
  next();
};
