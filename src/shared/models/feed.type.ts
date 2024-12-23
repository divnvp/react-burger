import { Status } from '../consts/status.enum';

export type Feed = {
  success: boolean;
  orders: FeedDetail[];
  total: number;
  totalToday: number;
};

export type FeedDetail = {
  _id: string;
  status: Status | string;
  number: number;
  name: string;
  ingredients: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
