import { DoctorWhereUniqueInput } from "../doctor/DoctorWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AppointmentCreateInput = {
  clinic?: string | null;
  date?: Date | null;
  doctorId?: DoctorWhereUniqueInput | null;
  history?: string | null;
  services?: string | null;
  pacient?: UserWhereUniqueInput | null;
};
