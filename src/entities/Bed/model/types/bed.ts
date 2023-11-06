export interface Bed {
  id: string;
  user_id: string;
  bed_id: string;
  plant_time: string;
  crop: string;
  harvest: boolean;
}

export interface BedsSchema {
  isLoading: boolean;
  error?: string;
  data: {
    beds: Bed[];
  };
}
