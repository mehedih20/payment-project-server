import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  return jwtDecode(token) as JwtPayload;
};
