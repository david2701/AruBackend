import { DoctorWhereUniqueInput } from "../doctor/DoctorWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ChatWhereInput = {
  createdAt?: Date;
  id?: string;
  idDoctor?: DoctorWhereUniqueInput | null;
  idUser?: UserWhereUniqueInput | null;
  message?: string | null;
  updatedAt?: Date;
};
