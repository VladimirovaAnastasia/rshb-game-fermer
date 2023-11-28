export interface TaskDetails {
  id: string;
  cost: number;
  type: "Plant" | "FinanceGenius";
}

export interface Task {
  id: string;
  completedAt?: string;
  task: TaskDetails;
}

export interface TasksSchema {
  isLoading: boolean;
  error?: string;
  data: {
    tasks: Task[];
  };
}
