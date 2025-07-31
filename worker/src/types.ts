export interface Project {
  wavFile: string;
  projectFile: string;
}

export interface ProjectsData {
  projectInfo: Record<string, Project>;
}