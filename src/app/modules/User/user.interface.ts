export type TUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photoUrl: string;
  accountNumber: number;
  balance: number;
  pin: string;
};

export type TUserLogin = {
  username: string;
  password: string;
};

export type TSetUserPin = {
  newPin: number;
};

export type TUpdateUserPin = {
  oldPin: number;
  newPin: number;
};

export type TVerifyUserPin = {
  userPin: number;
};
