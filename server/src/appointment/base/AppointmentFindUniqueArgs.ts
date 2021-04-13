import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentWhereUniqueInput } from "./AppointmentWhereUniqueInput";

@ArgsType()
class AppointmentFindUniqueArgs {
  @Field(() => AppointmentWhereUniqueInput, { nullable: false })
  where!: AppointmentWhereUniqueInput;
}

export { AppointmentFindUniqueArgs };
