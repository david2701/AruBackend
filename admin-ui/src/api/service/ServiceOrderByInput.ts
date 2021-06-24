import { SortOrder } from "../../util/SortOrder";

export type ServiceOrderByInput = {
  createdAt?: SortOrder;
  doctorId?: SortOrder;
  id?: SortOrder;
  servicesName?: SortOrder;
  updatedAt?: SortOrder;
};
