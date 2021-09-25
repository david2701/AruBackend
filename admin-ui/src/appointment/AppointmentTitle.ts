import { Appointment as TAppointment } from "../api/appointment/Appointment";

export const APPOINTMENT_TITLE_FIELD = "clinic";

export const AppointmentTitle = (record: TAppointment): string => {
  return record.clinic || record.id;
};
