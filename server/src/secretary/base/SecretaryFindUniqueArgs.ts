import { ArgsType, Field } from "@nestjs/graphql";
import { SecretaryWhereUniqueInput } from "./SecretaryWhereUniqueInput";

@ArgsType()
class SecretaryFindUniqueArgs {
  @Field(() => SecretaryWhereUniqueInput, { nullable: false })
  where!: SecretaryWhereUniqueInput;
}

export { SecretaryFindUniqueArgs };
