import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
  });
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

const getBalance = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getBalanceFromDb(token as string);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User balance fetched successfully",
    result,
  });
});

const getUserPinInfo = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getUserPinInfoFromDb(token as string);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User pin status fetched successfully",
    result: result,
  });
});

const setUserPin = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.setUserPinInDB(token as string, req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User pin set successfully",
    result: result,
  });
});

const updateUserPin = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.updateUserPinInDB(
    token as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User pin updated successfully",
    result: result,
  });
});

const verifyUserPin = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await UserServices.verifyUserPinInDB(
    token as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User pin verified successfully",
    result: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await UserServices.getAllUsersFromDB(token as string);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Users fetched successfully",
    result: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  getBalance,
  getUserPinInfo,
  setUserPin,
  updateUserPin,
  verifyUserPin,
  getAllUsers,
};
