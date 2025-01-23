# CRUD Personas Backend - Express + TypeScript

![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=flat&logo=node.js&logoColor=ffffff) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=ffffff)

## Descripción 📖

Este proyecto implementa un **CRUD de personas** utilizando un backend basado en **Express** y **TypeScript**. El propósito de esta aplicación es gestionar datos de personas (como nombre, dirección, teléfono, etc.) y sus detalles asociados.

- **Tecnologías utilizadas**:
  - **Node.js**
  - **Express**
  - **TypeScript**
  - **MySQL** o **Base de datos Relacional** (si aplica)

## Requisitos previos ⚙️

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org) (LTS)
- [MySQL](https://www.mysql.com)

## Instalación 💻💻

Sigue estos pasos para configurar el proyecto:

1. **Clonar el repositorio**:

   Si aún no has clonado el proyecto, puedes hacerlo con el siguiente comando:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar depdendencias del proyecto**:

  Una vez clonado el repositorio es necesario instalar las dependencias antes de correr el servidor:

   ```bash
    npm install
   ```

## Ejecutar servidor 🚀
1. **Ejecutar el servidor**:

     Una vez instaladas las dependencias correctamente ejecutar el comando para iniciar el servidor express:

   ```bash
   npm run dev
   ```


## #####################          ENDPOINTS 🖱         #######################
1. **OBTENER A TODAS LAS PERSONAS**:
   ```bash
   http://localhost:5001/api/personas
   ```
2. **OBTENER POR ID**:

   -**:id** = el id debe ser los 8 primeros digitos del rut ej: 11222333-8 el id es 11222333
   ```bash
   http://localhost:5001/api/personas/id/:id
   ```
3. **OBTENER POR ID**:

   -**:id** = el id debe ser un ID string de 36 caracteres (id de el registro persona)
   ```bash
   http://localhost:5001/api/personas/eliminar/:id
   ```
4. **OBTENER POR ID**:

   -**:BODY DE LA SOLICITUD** = el body de la peticion debe ser un objeto de tipo Person.
    -**:METODO** = POST
   ```bash
   http://localhost:5001/api/personas/agregar
   ```
4. **OBTENER POR ID**:
   -**:id** = el id debe ser un ID string de 36 caracteres (id de el registro persona)
   -**:BODY DE LA SOLICITUD** = el body de la peticion debe ser un objeto de tipo Person con los nuevos datos.
    -**:METODO** = PATCH
   ```bash
   http://localhost:5001/api/personas/actualizar/:id
   ```
