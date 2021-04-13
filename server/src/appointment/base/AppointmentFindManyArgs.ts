import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentWhereInput } from "./AppointmentWhereInput";

@ArgsType()
class AppointmentFindManyArgs {
  @Field(() => AppointmentWhereInput, { nullable: true })
  where?: AppointmentWhereInput;
}

export { AppointmentFindManyArgs };
