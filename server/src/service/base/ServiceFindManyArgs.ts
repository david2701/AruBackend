import { ArgsType, Field } from "@nestjs/graphql";
import { ServiceWhereInput } from "./ServiceWhereInput";

@ArgsType()
class ServiceFindManyArgs {
  @Field(() => ServiceWhereInput, { nullable: true })
  where?: ServiceWhereInput;
}

export { ServiceFindManyArgs };
