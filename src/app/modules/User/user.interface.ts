export type TUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photoUrl: string;
  accountNumber: number;
  balance: number;
};

export type TUserLogin = {
  username: string;
  password: string;
};
