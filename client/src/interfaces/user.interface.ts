export interface IUser {
  _id: string;
  userType: string;
  name: string;
  address: string;
  phoneNo: string;
  orders: string[] | null;
  totalOrders: number;
  paid: number;
  remaining: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
