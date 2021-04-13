import { DoctorWhereUniqueInput } from "../doctor/DoctorWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Appointment = {
  clinic: string | null;
  createdAt: Date;
  date: Date | null;
  doctorId?: DoctorWhereUniqueInput | null;
  history: string | null;
  id: string;
  services: string | null;
  updatedAt: Date;
  pacient?: UserWhereUniqueInput | null;
};
