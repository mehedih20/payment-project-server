import catchAsync from "../../utils/catchAsync";
import { ChatServices } from "./chat.services";

// Conversation
const createConversation = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await ChatServices.createConversationInDB(
    token as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Conversation created successfully",
    data: result,
  });
});

const getUserConversations = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await ChatServices.getUserConversationsFromDB(token as string);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Conversations fetched successfully",
    data: result,
  });
});

const checkIfConversationExists = catchAsync(async (req, res) => {
  const { receiverId } = req.params;
  const token = req.headers.authorization;
  const result = await ChatServices.checkIfConversationExistsInDB(
    token as string,
    receiverId,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Conversation checking successfull",
    result,
  });
});

// Message

const createMessage = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await ChatServices.createMessageInDB(
    token as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Message created successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req, res) => {
  const { conversationId } = req.params;
  const result = await ChatServices.getMessagesFromDB(conversationId);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Messages fetched successfully",
    data: result,
  });
});

export const ChatController = {
  createConversation,
  getUserConversations,
  checkIfConversationExists,
  createMessage,
  getMessages,
};
