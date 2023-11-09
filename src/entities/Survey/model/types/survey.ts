export interface Question {
  question: string;
  answer: string;
}

export interface Survey {
  id: string;
  task_id: string;
  questions: Question[];
}

export interface SurveysSchema {
  isLoading: boolean;
  error?: string;
  data: {
    survey: Survey | null;
  };
}
