import { Chat as TChat } from "../api/chat/Chat";

export const CHAT_TITLE_FIELD = "message";

export const ChatTitle = (record: TChat) => {
  return record.message;
};
