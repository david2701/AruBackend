import { ArgsType, Field } from "@nestjs/graphql";
import { DoctorWhereInput } from "./DoctorWhereInput";

@ArgsType()
class DoctorFindManyArgs {
  @Field(() => DoctorWhereInput, { nullable: true })
  where?: DoctorWhereInput;
}

export { DoctorFindManyArgs };
