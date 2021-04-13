import { DoctorWhereUniqueInput } from "../doctor/DoctorWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ChatUpdateInput = {
  idDoctor?: DoctorWhereUniqueInput | null;
  idUser?: UserWhereUniqueInput | null;
  message?: string | null;
};
