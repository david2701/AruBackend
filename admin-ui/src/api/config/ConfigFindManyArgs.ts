import { ConfigWhereInput } from "./ConfigWhereInput";
import { ConfigOrderByInput } from "./ConfigOrderByInput";

export type ConfigFindManyArgs = {
  where?: ConfigWhereInput;
  orderBy?: ConfigOrderByInput;
  skip?: number;
  take?: number;
};
