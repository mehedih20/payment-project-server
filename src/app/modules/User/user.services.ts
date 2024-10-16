import config from "../../config";
import { decodeToken } from "../../utils/decodeToken";
import {
  TSetUserPin,
  TUpdateUserPin,
  TUser,
  TUserLogin,
  TVerifyUserPin,
} from "./user.interface";
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
    _id: user?._id,
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

const getBalanceFromDb = async (token: string) => {
  const decoded = decodeToken(token);

  const result = await User.findOne({
    _id: decoded._id,
  }).select("balance");

  return result;
};

const getUserPinInfoFromDb = async (token: string) => {
  const decoded = decodeToken(token);

  const user = await User.findOne({
    username: decoded.username,
  }).select("pin");

  if (user?.pin) {
    return {
      pinExist: true,
    };
  }

  return {
    pinExist: false,
  };
};

const setUserPinInDB = async (token: string, payload: TSetUserPin) => {
  const decoded = decodeToken(token);
  const user = await User.findOne({
    username: decoded.username,
  });

  if (user?.pin) {
    throw new Error("Pin already set");
  }

  const hashedPin = await bcrypt.hash(
    String(payload.newPin),
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      username: decoded.username,
    },
    {
      $set: { pin: hashedPin },
    },
    { new: true },
  ).select("username updatedAt");

  return result;
};

const updateUserPinInDB = async (token: string, payload: TUpdateUserPin) => {
  const decoded = decodeToken(token);
  const user = await User.findOne({ username: decoded.username });

  const isPinMatched = await bcrypt.compare(
    String(payload.oldPin),
    user?.pin as string,
  );

  if (!isPinMatched) {
    throw new Error("Incorrect pin");
  }

  const hashedPin = await bcrypt.hash(
    String(payload.newPin),
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      username: decoded.username,
    },
    {
      $set: { pin: hashedPin },
    },
    { new: true },
  ).select("username updatedAt");

  return result;
};

const verifyUserPinInDB = async (token: string, payload: TVerifyUserPin) => {
  const decoded = decodeToken(token);
  const user = await User.findOne({ username: decoded.username });

  const isPinMatched = await bcrypt.compare(
    String(payload.userPin),
    user?.pin as string,
  );

  if (!isPinMatched) {
    throw new Error("Incorrect pin");
  }

  return isPinMatched;
};

const getAllUsersFromDB = async (token: string) => {
  const decoded = decodeToken(token);

  const result = await User.find({
    _id: {
      $ne: decoded._id,
    },
  }).select("-password -pin -balance -__v");

  return result;
};

export const UserServices = {
  createUserIntoDb,
  loginUserToDb,
  getBalanceFromDb,
  getUserPinInfoFromDb,
  setUserPinInDB,
  updateUserPinInDB,
  verifyUserPinInDB,
  getAllUsersFromDB,
};
