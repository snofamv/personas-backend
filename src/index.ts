import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Definir una ruta básica
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo desde Express y TypeScript!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
