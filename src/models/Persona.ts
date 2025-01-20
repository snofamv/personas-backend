import { RowDataPacket } from "mysql2";

export interface Persona {
  id: string;
  rut: string;
  dv: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  fec_nac: Date;
  sexo: string;
  nacionalidad: string;
  id_detalle: string;
}

export interface DetallesPersona {
  id: string;
  direccion: string;
  telefono: string;
  region: number;
  comuna: number;
  provincia: number;
  email: string;
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
