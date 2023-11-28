export enum CropEnum {
  Carrot = "Carrot",
  Potato = "Potato",
  Beet = "Beet",
  Wheat = "Wheat",
  Flower = "Flower",
}

export interface Bed {
  id: string;
  index: number;
  plantedAt: string;
  crop: CropEnum;
}

export interface BedsSchema {
  isLoading: boolean;
  error?: string;
  data: {
    beds: Bed[];
  };
}
