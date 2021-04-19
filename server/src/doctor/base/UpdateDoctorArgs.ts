import { ArgsType, Field } from "@nestjs/graphql";
import { DoctorWhereUniqueInput } from "./DoctorWhereUniqueInput";
import { DoctorUpdateInput } from "./DoctorUpdateInput";

@ArgsType()
class UpdateDoctorArgs {
  @Field(() => DoctorWhereUniqueInput, { nullable: false })
  where!: DoctorWhereUniqueInput;
  @Field(() => DoctorUpdateInput, { nullable: false })
  data!: DoctorUpdateInput;
}

export { UpdateDoctorArgs };
