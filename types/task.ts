export type FilterType = 'All' | 'Active' | 'Completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}
