# Sistema de Gestión de Usuarios y Roles

Este proyecto es una API REST para gestión de usuarios y roles con autenticación JWT.

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Alans369/PruebaTecnica.git
cd PruebaTecnica
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con:
```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"
```

4. Ejecutar migraciones de la base de datos:
```bash
npx prisma migrate dev
```

5. Iniciar el servidor:
```bash
npm start
```

## Rutas de la API

### Autenticación

#### Login
- **URL**: `/auth/login`
- **Método**: `POST`
- **Body**:
```json
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
}
```
- **Respuesta Exitosa**:
```json
{
    "message": "Login exitoso",
    "user": {
        "id": 1,
        "name": "Usuario",
        "role": "admin"
    }
}
```

### Usuarios

#### Crear Usuario
- **URL**: `/users/create`
- **Método**: `POST`
- **Autenticación**: Required
- **Body**:
```json
{
    "name": "Nuevo Usuario",
    "email": "nuevo@ejemplo.com",
    "password": "contraseña123",
    "role_id": 1
}
```

#### Obtener Usuarios
- **URL**: `/users`
- **Método**: `GET`
- **Autenticación**: Required

#### Actualizar Usuario
- **URL**: `/users/:id`
- **Método**: `PUT`
- **Autenticación**: Required
- **Body**:
```json
{
    "name": "Usuario Actualizado",
    "email": "actualizado@ejemplo.com",
    "role_id": 2
}
```

#### Eliminar Usuario
- **URL**: `/users/:id`
- **Método**: `DELETE`
- **Autenticación**: Required

### Roles

#### Crear Rol
- **URL**: `/roles/create`
- **Método**: `POST`
- **Autenticación**: Required
- **Body**:
```json
{
    "name": "Nuevo Rol"
}
```

#### Obtener Roles
- **URL**: `/roles`
- **Método**: `GET`
- **Autenticación**: Required

#### Actualizar Rol
- **URL**: `/roles/:id`
- **Método**: `PUT`
- **Autenticación**: Required
- **Body**:
```json
{
    "name": "Rol Actualizado"
}
```

#### Eliminar Rol
- **URL**: `/roles/:id`
- **Método**: `DELETE`
- **Autenticación**: Required

## Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación. Los tokens se envían a través de cookies HTTP-only.

### Headers necesarios en Postman:
```
Content-Type: application/json
Cookie: accessToken=<token>; refreshToken=<refresh_token>
```

## Manejo de Errores

La API devuelve los siguientes códigos de estado:

- `200`: Éxito
- `201`: Recurso creado
- `400`: Error de validación
- `401`: No autorizado
- `403`: Prohibido
- `404`: No encontrado
- `500`: Error del servidor

## Interfaz Web

También puedes acceder a la interfaz web navegando a:
- `http://localhost:3000` - Página de login
- `http://localhost:3000/users` - Gestión de usuarios
- `http://localhost:3000/roles` - Gestión de roles

## Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

## Seguridad

- Tokens JWT con renovación automática
- Cookies HTTP-only
- Validación de datos
- Control de acceso basado en roles
