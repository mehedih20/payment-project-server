import { Router } from "express";
import validateData from "../../middlewares/validateData";
import { auth } from "../../middlewares/auth";
import {
  conversationValidationSchema,
  messageValidationSchema,
} from "./chat.validation";
import { ChatController } from "./chat.controller";

const router = Router();

// Conversation
router.post(
  "/create-conversation",
  auth(),
  validateData(conversationValidationSchema),
  ChatController.createConversation,
);

router.get("/conversations", auth(), ChatController.getUserConversations);

router.get(
  "/check-conversation/:receiverId",
  auth(),
  ChatController.checkIfConversationExists,
);

// Message
router.post(
  "/create-message",
  auth(),
  validateData(messageValidationSchema),
  ChatController.createMessage,
);

router.get("/messages/:conversationId", auth(), ChatController.getMessages);

export const ChatRoutes = router;
