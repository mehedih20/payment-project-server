import { jwtDecode } from "jwt-decode";
import catchAsync from "../utils/catchAsync";
import { User } from "../modules/User/user.model";
import { JwtPayload } from "jsonwebtoken";

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //checking if the token is undefined
    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const decoded = jwtDecode(token) as JwtPayload;

    //checking if token is valid
    if (!decoded) {
      throw new Error("Unauthorized Access");
    }

    //checking if the token has expired
    if (decoded.exp) {
      const timeNow = Math.round(Date.now() / 1000);
      if (decoded.exp < timeNow) {
        throw new Error("Unauthorized Access");
      }
    }

    //verifying user from token data
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    next();
  });
};
