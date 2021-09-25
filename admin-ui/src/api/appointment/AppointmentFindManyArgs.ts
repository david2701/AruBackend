import { AppointmentWhereInput } from "./AppointmentWhereInput";
import { AppointmentOrderByInput } from "./AppointmentOrderByInput";

export type AppointmentFindManyArgs = {
  where?: AppointmentWhereInput;
  orderBy?: AppointmentOrderByInput;
  skip?: number;
  take?: number;
};
