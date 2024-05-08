export interface IEquipment {
  key: number;
  name: string;
  type: string;
  description: string;
  mandatory: boolean;
  rent: {
    price: string;
    description: string;
  };
  sale: {
    price: string;
    description: string;
  };
  credit: IEquipmentCreditOption[];
}
export interface IEquipmentJson {
  key?: number;
  name: string;
  type: string;
  description?: string;
  mandatory?: "1" | boolean;
  rent?: {
    price: string;
    description?: string;
  };
  sale?: {
    price: string;
    description?: string;
  };
  credit?: {
    price: string;
    time: string;
    key?: number;
    fp?: string;
  }[];
}
export interface IEquipmentCreditOption {
  price: string;
  time: string;
  key: number;
  fp: string;
}
