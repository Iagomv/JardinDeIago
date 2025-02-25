# Jardín Remoto Oasis.sl

## Descripción

**Jardín Remoto Oasis** ofrece un servicio innovador de jardinería remota. Los usuarios pueden tener plantas en nuestras instalaciones sin ocupar espacio en casa, mientras las cuidan expertos. Además, pueden monitorear y cuidar sus plantas de manera remota a través de nuestra aplicación.

---

## Tecnologías utilizadas

- **Frontend (Cliente Web):** React, Bootstrap
- **Backend (Servidor Principal):** Node.js, Express, Socket.io
- **Backend (Comunicación con Arduino):** Node.js, Socket.io
- **Base de Datos:** Firebase Firestore
- **Autenticación de usuarios:** Firebase Auth
- **Aplicación de Escritorio (para empleados):** Java, Swing
- **Dependencias adicionales:**
  - **Gson** (v2.12.1) – para manejo de JSON en la aplicación Java
  - **HttpClient** (v4.5.14) – para realizar solicitudes HTTP en la aplicación Java

---

## Estructura del Proyecto

C:\Users\iagom\Desktop\PNI │ ├── backend/ # Servidor que gestiona la lógica y comunicación con Firestore ├── backendArduino/ # Servidor de comunicación con sensores (MegaBoard2560) ├── Client/ # Aplicación frontend en React ├── Java/ # Aplicación de escritorio para personal de tienda ├── README.md # Documentación del proyecto └── .gitignore # Archivos ignorados en Git

---

## Instalación

1. Clona el repositorio

2. ### Backend (Servidor Arduino)

   1. Navega a la carpeta `backendArduino`.
   2. Instala las dependencias con:
      npm install
   3. Para iniciar el servidor en modo de desarrollo, ejecuta:
      node --watch serverB.js

3. ### Backend (Servidor Principal)

   1. Navega a la carpeta `backend`.
   2. Instala las dependencias con:
      npm install
   3. Para iniciar el servidor en modo de desarrollo, ejecuta:
      node --watch serverA.js

4. ### Frontend (Aplicación Web)
   1. Navega a la carpeta `Client`.
   2. Instala las dependencias con:
      npm install
   3. Para iniciar la aplicación React en modo de desarrollo, ejecuta:
      npm run dev
5. ### Java (Aplicación de Escritorio)
   1. Navega a la carpeta `Java`.
   2. Asegúrate de tener las Gson-2.12.1 y httpclient-4.5.14 en el directorio lib.
   3. Abre el proyecto en un IDE como IntelliJ IDEA o Eclipse y ejecuta el código.

## Uso

### Autenticación de usuarios

Los usuarios pueden registrarse e iniciar sesión a través de **Firebase Auth**. El registro y login se gestionan a través de las siguientes rutas:

- **Registro de usuario:**

  - **Endpoint:** `POST /registro`
  - **Datos requeridos:** `email`, `password`

- **Inicio de sesión:**
  - **Endpoint:** `POST /login`
  - **Datos requeridos:** `email`, `password`

---

### Comunicación con Sensores (Backend Arduino)

El servidor **backendArduino** recibe los datos de los sensores (como temperatura, humedad y nivel de agua) de las plantas en tiempo real a través de una **MegaBoard2560**. Estos datos se envían a través de **Sockets** al servidor principal, donde se procesan y se almacenan.

---

### Gestión de Plantas y Clientes (Aplicación de Escritorio)

Los empleados gestionan los datos de las plantas, los límites de temperatura, los niveles de agua y otros parámetros utilizando una **aplicación de escritorio en Java**. Esta aplicación se comunica con el servidor principal a través de solicitudes **HTTP** para realizar operaciones CRUD sobre las plantas y clientes.

---

### Visualización para Usuarios

El cliente web en **React** permite a los usuarios monitorear el estado de sus plantas en tiempo real. Los usuarios pueden ver detalles como la temperatura, humedad y estado del agua. Además, podrán realizar compras de nuevos productos como **macetas** y **plantas**.

---

### Funcionalidades Pendientes

- **Alertas y notificaciones:** Los usuarios recibirán notificaciones cuando sea necesario realizar ajustes en los niveles de temperatura o agua, o cuando las plantas necesiten atención especial.

---

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz **commit**:
   ```bash
   git commit -am 'Añadir nueva funcionalidad'
   ```
4. Empuja tus cambios a tu repositorio:
   ```bash
    git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

## Notas Adicionales

- **Sockets:** La comunicación entre servidores se maneja utilizando la librería **Socket.io**, lo que permite la actualización en tiempo real de los datos entre el servidor de Arduino, el servidor principal y el cliente.
- **Pruebas:** Actualmente se están realizando **pruebas manuales**, pero se tiene planeado incorporar **pruebas automatizadas** más adelante.
