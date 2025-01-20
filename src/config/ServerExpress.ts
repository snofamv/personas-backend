import express, { Application } from "express";
import personasRoutes from "../routes/personas.routes";
import cors from "cors";
export default class ServerExpress {
  app: Application = express();
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.cargarMiddlewares();
  }
  cargarMiddlewares() {
    // Configuraciones para el servidor CORS Y JSON PARSE
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api/personas", personasRoutes);
  }
  levantarServidor() {
    // Iniciar el servidor
    this.app.listen(this.port, () => {
      console.log(`SERVER CORRIENDO EN:  http://localhost:${this.port}`);
    });
  }
}
