export type DoctorWhereInput = {
  clinic?: string | null;
  createdAt?: Date;
  dateLastPacient?: Date | null;
  email?: string | null;
  id?: string;
  lastPacient?: boolean | null;
  mobile?: string | null;
  name?: string | null;
  services?: string | null;
  updatedAt?: Date;
  workHour?: string | null;
};
