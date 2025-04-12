import config from "../../config";
import { decodeToken } from "../../utils/decodeToken";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserIntoDb = async (payload: TUser) => {
  const alreadyRegisterUser = await User.findOne({
    email: payload.email,
  });

  if (alreadyRegisterUser) {
    return false;
  }

  const result = await User.create(payload);

  const createdUser = await User.findById(result._id).select("-password -__v");
  return createdUser;
};

const loginUserToDb = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload.email });
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
    name: user?.name,
    email: user?.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "15d",
  });

  return {
    jwtPayload,
    accessToken,
  };
};

export const UserServices = {
  createUserIntoDb,
  loginUserToDb,
};
