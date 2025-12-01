# Avaluapp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DavidVazquezRivas/Avaluapp)

Plataforma de gestión de encuestas con arquitectura de doble rol: administradores diseñan el contenido y usuarios gestionan la distribución.

> 💡 **¿Tienes dudas sobre el código?** Usa [DeepWiki](https://deepwiki.com/DavidVazquezRivas/Avaluapp) para explorar la documentación interactiva del proyecto.

## Características

- **Sistema de roles**: Admins crean encuestas, Users las distribuyen
- **Enlaces públicos**: Participantes responden sin registrarse
- **Organización por etiquetas**: Categoriza preguntas con tags de colores
- **Análisis de resultados**: Visualiza datos agregados y genera informes

## Stack Tecnológico

| Capa          | Tecnología                              |
| ------------- | --------------------------------------- |
| Frontend      | React 19, TypeScript, Material UI, Vite |
| Backend       | Spring Boot, Java                       |
| Base de datos | PostgreSQL                              |
| Contenedores  | Docker, Docker Compose                  |

## Inicio Rápido

### Requisitos

- Docker y Docker Compose

### Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DavidVazquezRivas/Avaluapp.git
   cd Avaluapp
   ```

2. Crea el archivo `.env` en la raíz:

   ```env
   # Base de datos
   POSTGRES_DB=avaluapp
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=tu_password_seguro

   # JWT
   JWT_SECRET=tu_secret_jwt_muy_largo

   # Admin inicial
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin_password
   ```

3. Inicia los servicios:

   ```bash
   docker-compose up -d
   ```

4. Accede a la aplicación en `http://localhost`

## Estructura del Proyecto

```
Avaluapp/
├── api/          # Backend Spring Boot
├── app/          # Frontend React + Vite
└── docker-compose.yml
```

## Desarrollo

### Frontend (sin Docker)

```bash
cd app
npm install
npm run dev
```

### Backend (sin Docker)

```bash
cd api
./mvnw spring-boot:run
```
