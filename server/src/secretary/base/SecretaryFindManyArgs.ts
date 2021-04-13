import { ArgsType, Field } from "@nestjs/graphql";
import { SecretaryWhereInput } from "./SecretaryWhereInput";

@ArgsType()
class SecretaryFindManyArgs {
  @Field(() => SecretaryWhereInput, { nullable: true })
  where?: SecretaryWhereInput;
}

export { SecretaryFindManyArgs };
