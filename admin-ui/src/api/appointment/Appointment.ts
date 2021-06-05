import { Doctor } from "../doctor/Doctor";
import { User } from "../user/User";

export type Appointment = {
  clinic: string | null;
  createdAt: Date;
  date: Date | null;
  doctorId?: Doctor | null;
  history: string | null;
  id: string;
  services: string | null;
  updatedAt: Date;
  pacient?: User | null;
};
