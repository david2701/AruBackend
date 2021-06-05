import { Appointment } from "../appointment/Appointment";
import { Chat } from "../chat/Chat";

export type User = {
  appointments?: Array<Appointment>;
  chats?: Array<Chat>;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
