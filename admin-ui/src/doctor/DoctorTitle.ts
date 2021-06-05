import { Doctor as TDoctor } from "../api/doctor/Doctor";

export const DOCTOR_TITLE_FIELD = "name";

export const DoctorTitle = (record: TDoctor) => {
  return record.name;
};
