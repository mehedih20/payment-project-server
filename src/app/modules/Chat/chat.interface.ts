import { Types } from "mongoose";

export type TConversation = {
  participants: Types.ObjectId[];
};

export type TReceiver = {
  receiver: Types.ObjectId;
};

export type TMessage = {
  conversationId: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  message: string;
};
