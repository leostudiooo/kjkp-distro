# GitHub Copilot Instructions - kjkp-distro

This project is a distribution site for "KJKP" (锟斤拷P) musical instrumentals and project files. it consists of a Vue 3 frontend and a Cloudflare Worker backend.

## Project Architecture
- **Frontend (`/`)**: Vue 3 + Vite. Bundled as a single HTML file using `vite-plugin-singlefile`.
- **Backend (`/worker`)**: Cloudflare Workers using R2 for storage and KV for project metadata.
- **Workflow**: Files are stored in R2, metadata is in KV, and the frontend queries the worker via `/api/search` to get signed/proxied download links.

## Tech Stack & Conventions
- **Vue 3 (Composition API)**: Use `<script setup lang="ts">`.
- **Styles**: Theme variables are defined in [src/styles/theme.css](src/styles/theme.css) and applied globally. Reference them via `var(--bg-color)`, `var(--text-color)`, etc.
- **Data Flow**:
    - [src/projects.json](src/projects.json) is the master list of projects.
    - Cloudflare KV (`KJKP_PROJECTS`) uses individual project names as keys and stringified JSON as values.
    - Format: `{"wav": "filename.wav", "project": "filename.vpr", "others": "filename.zip"}`.

## API Patterns
- **CORS**: All worker responses include CORS headers for compatibility.
- **Search Flow**:
    1. POST to `/api/search` with `{ keyword, fileType }`.
    2. Returns a JSON with a `downloadUrl` pointing to the `/proxy/` endpoint.
- **Proxying**: The worker's `/proxy/:key` endpoint streams files from R2 to bypass public access restrictions and handle small caches.

## Developer Workflows
- **Frontend Development**: 
  ```bash
  pnpm dev # Root directory
  ```
- **Backend Development**:
  ```bash
  cd worker && pnpm dev
  ```
- **Metadata Update**:
  When updating [src/projects.json](src/projects.json), ensure the corresponding KV keys are updated. Individual keys for each project name are required for the `/api/search` endpoint.

## Component Patterns
- **SearchInterface**: Used for user input. Emits `'search'` events handled by [src/App.vue](src/App.vue).
- **Toast**: Handles all notifications including download progress. Use the `progress` prop (0-100) for file downloads.

## Build Nuances
- The project uses `vite-plugin-singlefile`. Do not add features that rely on multiple output files (like dynamic imports that result in separate chunks) unless specifically requested.
