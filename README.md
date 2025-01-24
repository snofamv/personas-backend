# CRUD Personas Backend - Express + TypeScript

Este proyecto implementa un **CRUD de personas** utilizando un backend basado en **Express** y **TypeScript**. Su objetivo es gestionar datos de personas, incluyendo detalles como nombre, dirección, teléfono, entre otros.

---

## Requisitos previos ⚙️

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org) (versión LTS recomendada).
- [MySQL](https://www.mysql.com).

Además, debes configurar un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DB_PORT=9999
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=mi_bd
PORT=5000
NODE_ENVIRONMENT=production
```

---

## Instalación 💻

Sigue estos pasos para configurar y ejecutar el proyecto:

### 1. Clonar el repositorio

Si aún no has clonado el proyecto, puedes hacerlo ejecutando:

```bash
git clone https://github.com/snofamv/personas-back.git
cd personas-back
```

### 2. Instalar dependencias

Una vez dentro del directorio del proyecto, instala las dependencias necesarias:

```bash
npm install
```

---

## Ejecución del servidor 🚀

Para iniciar el servidor, sigue estos pasos:

1. Ejecuta el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor en el puerto configurado (por defecto, 5000).

---

## Endpoints 🛠️

A continuación, se detallan los endpoints disponibles en la API:

### 1. Obtener todas las personas

**Descripción:** Devuelve una lista de todas las personas registradas.

**URL:**
```bash
GET http://localhost:5000/api/personas
```

---

### 2. Obtener una persona por ID

**Descripción:** Devuelve los datos de una persona según su ID.

**URL:**
```bash
GET http://localhost:5000/api/personas/id/:id
```

**Nota:**
- **`:id`** debe ser el valor numérico correspondiente a los primeros 8 dígitos del RUT (por ejemplo, para 11222333-8, el ID es 11222333).

---

### 3. Eliminar una persona por ID

**Descripción:** Elimina una persona del registro según su ID.

**URL:**
```bash
DELETE http://localhost:5000/api/personas/eliminar/:id
```

**Nota:**
- **`:id`** debe ser un string de 36 caracteres (ID del registro).

---

### 4. Agregar una nueva persona

**Descripción:** Registra una nueva persona en el sistema.

**URL:**
```bash
POST http://localhost:5000/api/personas/agregar
```

**Body de la solicitud:**
Debe ser un objeto JSON con el siguiente formato:
```json
{
  "rut": "string",
  "dv": "string",
  "nombre": "string",
  "apaterno": "string",
  "amaterno": "string",
  "fec_nac": "YYYY-MM-DD",
  "sexo": "string",
  "nacionalidad": "string",
  "activo": true,
  "estado_cv": 0
}
```

---

### 5. Actualizar una persona por ID

**Descripción:** Actualiza los datos de una persona según su ID.

**URL:**
```bash
PATCH http://localhost:5000/api/personas/actualizar/:id
```

**Notas:**
- **`:id`** debe ser un string de 36 caracteres (ID del registro).
- **Body de la solicitud:** Debe ser un objeto JSON con los nuevos datos a actualizar, siguiendo el formato del endpoint "Agregar una nueva persona".

---

## Contacto

Si tienes preguntas o problemas relacionados con este proyecto, no dudes en contactarme.

**Autor:** snofamv  
**Repositorio:** [GitHub - personas-back](https://github.com/snofamv/personas-back)

