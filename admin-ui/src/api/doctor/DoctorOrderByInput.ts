import { SortOrder } from "../../util/SortOrder";

export type DoctorOrderByInput = {
  clinic?: SortOrder;
  createdAt?: SortOrder;
  dateLastPacient?: SortOrder;
  email?: SortOrder;
  id?: SortOrder;
  lastPacient?: SortOrder;
  mobile?: SortOrder;
  name?: SortOrder;
  services?: SortOrder;
  updatedAt?: SortOrder;
  workHour?: SortOrder;
};
