import catchAsync from "../../utils/catchAsync";
import {
  createUserIntoDb,
  getBalanceFromDb,
  loginUserToDb,
} from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDb(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserToDb(req.body);

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
  const { email } = req.params;
  const result = await getBalanceFromDb(email);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User balance fetched successfully",
    result: result,
  });
});

export { createUser, loginUser, getBalance };
