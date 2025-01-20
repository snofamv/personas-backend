import { ResultSetHeader } from "mysql2";

export interface PersonaResult extends ResultSetHeader {
  id: string;
}
