import mongoose from "mongoose";
import { decodeToken } from "../../utils/decodeToken";
import { THistory } from "./history.interface";
import { History } from "./history.model";

const createHistory = async (payload: THistory) => {
  const result = await History.create(payload);
  return result;
};

const getHistory = async (token: string) => {
  const decoded = decodeToken(token);

  const result = await History.find({
    doctorEmail: decoded?.email,
  });

  return result;
};

export const HistoryServices = {
  createHistory,
  getHistory,
};
