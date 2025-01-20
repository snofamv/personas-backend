import { RowDataPacket } from "mysql2";

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
