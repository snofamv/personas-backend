import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface PersonaResult extends ResultSetHeader {
  id: string;
}

export interface PersonaMysql extends RowDataPacket {
  id: string;
  rut: string;
  dv: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  fec_nac: Date;
  sexo: string;
  nacionalid: string;
  id_detalle: string;
}

export interface Persona {
  id?: string;
  rut: string;
  dv: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  fec_nac: string;
  sexo: string;
  nacionalidad: string;
  activo: number;
  estado_cv: number;
}

export enum EstadosCivil {
  "Soltero" = 1,
  "Casado" = 2,
  "Viudo" = 3,
  "Divorciado" = 4,
}
export enum Sexo {
  "Femenino" = "F",
  "Masculino" = "M",
  "No Binario" = "N",
}
