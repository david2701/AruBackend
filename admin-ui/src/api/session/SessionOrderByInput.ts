import { SortOrder } from "../../util/SortOrder";

export type SessionOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  tokenId?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
