import mysql from 'mysql2';
import options from './keys';

export const pool = mysql.createPool(options);

pool.getConnection((err, connection) => {
  if (err) {
    console.warn("Error en la conexion: => ",err);
  } else {
    console.log('conexión establecida con éxito');
    connection.release();
  }
});

export default pool;