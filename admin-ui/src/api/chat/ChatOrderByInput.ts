import { SortOrder } from "../../util/SortOrder";

export type ChatOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  idDoctorId?: SortOrder;
  idUserId?: SortOrder;
  message?: SortOrder;
  updatedAt?: SortOrder;
};
