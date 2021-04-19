import { ArgsType, Field } from "@nestjs/graphql";
import { DoctorWhereUniqueInput } from "./DoctorWhereUniqueInput";

@ArgsType()
class DoctorFindUniqueArgs {
  @Field(() => DoctorWhereUniqueInput, { nullable: false })
  where!: DoctorWhereUniqueInput;
}

export { DoctorFindUniqueArgs };
