import config from "../../config";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserIntoDb = async (payload: TUser) => {
  const userData = payload;
  const lastUser = await User.findOne().sort({
    createdAt: -1,
  });

  if (!lastUser) {
    userData.accountNumber = 20240000;
  } else {
    userData.accountNumber = Number(lastUser.accountNumber) + 1;
  }

  const result = await User.create(userData);

  const createdUser = await User.findById(result._id).select("-password -__v");
  return createdUser;
};

const loginUserToDb = async (payload: TUserLogin) => {
  const user = await User.findOne({ username: payload.username });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error("Incorrect password");
  }

  const jwtPayload = {
    _id: user?.id,
    username: user?.username,
    email: user?.email,
    fullName: `${user?.firstName} ${user?.lastName}`,
    accountNumber: user?.accountNumber,
    photoUrl: user?.photoUrl,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "15d",
  });

  return {
    jwtPayload,
    accessToken,
  };
};

const getBalanceFromDb = async (email: string) => {
  const result = await User.findOne({
    email,
  }).select("accountNumber balance");

  return result;
};

export { createUserIntoDb, loginUserToDb, getBalanceFromDb };
