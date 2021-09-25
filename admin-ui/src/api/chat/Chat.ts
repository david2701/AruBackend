import { Doctor } from "../doctor/Doctor";
import { User } from "../user/User";

export type Chat = {
  createdAt: Date;
  id: string;
  idDoctor?: Doctor | null;
  idUser?: User | null;
  message: string | null;
  updatedAt: Date;
};
