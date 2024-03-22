export interface IOrder {
  _id: string;
  orderType: string;
  orderNo: number;
  userId: string;
  khareedOrBakaya: string;
  products?: string[] | null;
  finalAmount: number;
  paid: number;
  remaining: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
