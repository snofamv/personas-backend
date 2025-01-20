import { ResultSetHeader } from "mysql2";

export interface PersonaDetallesResults extends ResultSetHeader {
  id: string;
}
