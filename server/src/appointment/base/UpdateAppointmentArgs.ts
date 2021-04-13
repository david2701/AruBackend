import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentWhereUniqueInput } from "./AppointmentWhereUniqueInput";
import { AppointmentUpdateInput } from "./AppointmentUpdateInput";

@ArgsType()
class UpdateAppointmentArgs {
  @Field(() => AppointmentWhereUniqueInput, { nullable: false })
  where!: AppointmentWhereUniqueInput;
  @Field(() => AppointmentUpdateInput, { nullable: false })
  data!: AppointmentUpdateInput;
}

export { UpdateAppointmentArgs };
