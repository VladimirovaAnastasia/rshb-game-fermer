export interface Task {
  id: string;
  user_id: string;
  type: string;
  last_activity_time: string;
  active: boolean;
  cost: number;
}

export interface TasksSchema {
  isLoading: boolean;
  error?: string;
  data: {
    tasks: Task[];
  };
}
