# EduardoProyectoFinalDEV.F

**Nombre:** Eduardo Solano
**Proyecto final del modulo 8**: Catálogo interactivo de productos

## Descripción
Catálogo de productos con búsqueda, filtros y detalles (se irá ampliando por partes del proyecto).

## Objetivos
- Trabajo de forma individual


## Estrategia de ramas
- `main`: rama estable (producción)  
- `develop`: integración  
- `feature/<nombre>`: trabajo por funcionalidad  
- `fix/<nombre>`: correcciones  


## Convención de commits
- `feat:` nueva funcionalidad  
- `fix:` corrección  
- `docs:` documentación  
- `chore:` mantenimiento  
- `refactor:` cambios de estructura sin alterar comportamiento  
- `style:` formato/estilos sin lógica



## Scripts
- `npm run dev` — entorno de desarrollo
- `npm run build` — build producción
- `npm run preview` — sirve el build localmente

## Requisitos
- Node 18+
- npm 9+

## Cómo correr
```bash
npm i
npm run dev

## Backend / API
- Base URL: `https://fakestoreapi.com`
- Variable de entorno: `VITE_API_BASE`
- Endpoints:
  - `GET /products` → lista de productos
  - `GET /products/categories` → lista de categorías

## Comunicación Front ↔ Back
- Cliente en `src/services/api.js` (fetch genérico).
- Servicio de productos en `src/services/products.js`.
- Ejemplo de consumo en `src/App.jsx`.

## Validaciones y manejo de errores (Parte 5)
- Biblioteca: Zod (`zod`)
- Esquemas: `src/validation/schemas.js`
- Utilidad de errores: `src/validation/utils.js`
- Validación de Login antes de llamar al backend.
- Manejo de errores de API con timeout y mensajes amigables en `src/services/api.js`.
- ErrorBoundary para fallos de render.

## Funcionalidades
- Listado con búsqueda, filtros por categoría y orden por precio.
- Login real (Fake Store `/auth/login`) y rutas protegidas.
- Manejo de errores (timeout, mensajes UI).
- Validaciones con Zod (login y/o filtros).
- Optimización: `useMemo`, `useCallback`, `React.memo`, `useDeferredValue`, `useTransition`.

## Variables de entorno
Crea `.env` a partir de `.env.example`:

## Scripts
- `npm run dev` — desarrollo
- `npm run build` — build producción
- `npm run preview` — servir build local

## Cómo correr local
```bash
npm ci
cp .env.example .env
npm run dev