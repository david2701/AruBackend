import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentWhereUniqueInput } from "./AppointmentWhereUniqueInput";

@ArgsType()
class DeleteAppointmentArgs {
  @Field(() => AppointmentWhereUniqueInput, { nullable: false })
  where!: AppointmentWhereUniqueInput;
}

export { DeleteAppointmentArgs };
