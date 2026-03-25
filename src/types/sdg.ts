export type SDGTarget = {
  id: number;
  name: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  type: 'input' | 'logic' | 'output';
  validation: string;
};

export type Roadmap = {
  id: string;
  courseTitle: string;
  primarySDG: SDGTarget;
  modules: Module[];
};

export type StudentProgress = {
  moduleId: string;
  status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  savedCode?: string;
};
