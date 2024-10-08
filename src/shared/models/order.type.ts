export type Order = {
  name: string;
  order: OrderNumber;
  success: boolean;
};

type OrderNumber = {
  number: number;
};
