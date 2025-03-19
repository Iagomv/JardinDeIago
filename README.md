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
- **Aplicación React Native:**
  
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

## Notas Adicionales

- **Sockets:** La comunicación entre servidores se maneja utilizando la librería **Socket.io**, lo que permite la actualización en tiempo real de los datos entre el servidor de Arduino, el servidor principal y el cliente.

