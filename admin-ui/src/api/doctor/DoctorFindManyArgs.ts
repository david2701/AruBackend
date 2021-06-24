import { DoctorWhereInput } from "./DoctorWhereInput";
import { DoctorOrderByInput } from "./DoctorOrderByInput";

export type DoctorFindManyArgs = {
  where?: DoctorWhereInput;
  orderBy?: DoctorOrderByInput;
  skip?: number;
  take?: number;
};
