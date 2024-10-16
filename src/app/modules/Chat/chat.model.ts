import { model, Schema } from "mongoose";
import { TConversation, TMessage } from "./chat.interface";

const conversationSchema = new Schema<TConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const messageSchema = new Schema<TMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Conversation = model<TConversation>(
  "Conversation",
  conversationSchema,
);

export const Message = model<TMessage>("Message", messageSchema);
