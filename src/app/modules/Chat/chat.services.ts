import { Types } from "mongoose";
import { TMessage, TReceiver } from "./chat.interface";
import { Conversation, Message } from "./chat.model";
import { decodeToken } from "../../utils/decodeToken";

// Converstation
const createConversationInDB = async (token: string, payload: TReceiver) => {
  const decoded = decodeToken(token);
  const senderObjectId = new Types.ObjectId(decoded._id);
  const receiverObjectId = new Types.ObjectId(payload.receiver);

  const result = await Conversation.create({
    participants: [senderObjectId, receiverObjectId],
  });

  return result;
};

const getUserConversationsFromDB = async (token: string) => {
  const decoded = decodeToken(token);
  const userObjectId = new Types.ObjectId(decoded._id);

  const result = await Conversation.aggregate([
    {
      $match: {
        participants: { $in: [userObjectId] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "participantDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              username: 1,
              accountNumber: 1,
              photoUrl: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        otherParticipant: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$participantDetails",
                as: "participant",
                cond: { $ne: ["$$participant._id", userObjectId] },
              },
            },
            0,
          ],
        },
      },
    },
  ]);

  return result;
};

const checkIfConversationExistsInDB = async (
  token: string,
  senderId: string,
) => {
  const decoded = decodeToken(token);

  const senderObjectId = new Types.ObjectId(decoded._id);
  const receiverObjectId = new Types.ObjectId(senderId);

  const isConversationExists = await Conversation.findOne({
    participants: { $all: [senderObjectId, receiverObjectId] },
  });

  const result = isConversationExists ? true : false;

  return result;
};

// Message

const createMessageInDB = async (token: string, payload: TMessage) => {
  const decoded = decodeToken(token);

  const senderObjectId = new Types.ObjectId(decoded._id);
  const receiverObjectId = new Types.ObjectId(payload.receiver);
  const conversationObjectId = new Types.ObjectId(payload.conversationId);

  const result = await Message.create({
    conversationId: conversationObjectId,
    sender: senderObjectId,
    receiver: receiverObjectId,
    message: payload.message,
  });

  return result;
};

const getMessagesFromDB = async (conversationId: string) => {
  const conversationObjectId = new Types.ObjectId(conversationId);

  const result = await Message.find({
    conversationId: conversationObjectId,
  })
    .populate([
      {
        path: "sender",
        select: "_id username",
      },
      {
        path: "receiver",
        select: "_id username",
      },
    ])
    .select("-conversationId -updatedAt -__v");

  return result;
};

export const ChatServices = {
  createConversationInDB,
  getUserConversationsFromDB,
  checkIfConversationExistsInDB,
  createMessageInDB,
  getMessagesFromDB,
};
