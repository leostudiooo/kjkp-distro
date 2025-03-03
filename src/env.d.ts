/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.json' {
  export interface Project {
    wavFile: string;
    projectFile: string;
  }

  export interface ProjectsJson {
    projectInfo: {
      [songName: string]: Project;
    }
  }

  const content: ProjectsJson;
  export default content;
}