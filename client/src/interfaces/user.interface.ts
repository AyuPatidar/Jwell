export interface IUser {
  userType: string;
  name: string;
  address: string;
  phoneNo: string;
  orders?: null[] | null;
  paid: number;
  remaining: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
