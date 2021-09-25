import { SortOrder } from "../../util/SortOrder";

export type AppointmentOrderByInput = {
  clinic?: SortOrder;
  createdAt?: SortOrder;
  date?: SortOrder;
  doctorIdId?: SortOrder;
  history?: SortOrder;
  id?: SortOrder;
  services?: SortOrder;
  updatedAt?: SortOrder;
  pacientId?: SortOrder;
};
