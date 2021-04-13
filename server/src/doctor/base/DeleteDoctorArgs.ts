import { ArgsType, Field } from "@nestjs/graphql";
import { DoctorWhereUniqueInput } from "./DoctorWhereUniqueInput";

@ArgsType()
class DeleteDoctorArgs {
  @Field(() => DoctorWhereUniqueInput, { nullable: false })
  where!: DoctorWhereUniqueInput;
}

export { DeleteDoctorArgs };
