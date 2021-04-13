import { ArgsType, Field } from "@nestjs/graphql";
import { DoctorCreateInput } from "./DoctorCreateInput";

@ArgsType()
class CreateDoctorArgs {
  @Field(() => DoctorCreateInput, { nullable: false })
  data!: DoctorCreateInput;
}

export { CreateDoctorArgs };
