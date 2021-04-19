import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentCreateInput } from "./AppointmentCreateInput";

@ArgsType()
class CreateAppointmentArgs {
  @Field(() => AppointmentCreateInput, { nullable: false })
  data!: AppointmentCreateInput;
}

export { CreateAppointmentArgs };
