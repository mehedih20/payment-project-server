import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);

  if (!result) {
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User already exist with the same email!",
    });
  } else {
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: result,
    });
  }
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserToDb(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User Logged in successfully",
    result: {
      userData: result.jwtPayload,
      token: result.accessToken,
    },
  });
});

export const UserController = {
  createUser,
  loginUser,
};
