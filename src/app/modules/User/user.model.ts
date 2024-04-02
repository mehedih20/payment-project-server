import { Schema, model } from "mongoose";
import { TUser, TUserLogin } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

export const userLoginSchema = new Schema<TUserLogin>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    accountNumber: {
      type: Number,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

export const User = model<TUser>("User", userSchema);
