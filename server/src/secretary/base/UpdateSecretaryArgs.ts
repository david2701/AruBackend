import { ArgsType, Field } from "@nestjs/graphql";
import { SecretaryWhereUniqueInput } from "./SecretaryWhereUniqueInput";
import { SecretaryUpdateInput } from "./SecretaryUpdateInput";

@ArgsType()
class UpdateSecretaryArgs {
  @Field(() => SecretaryWhereUniqueInput, { nullable: false })
  where!: SecretaryWhereUniqueInput;
  @Field(() => SecretaryUpdateInput, { nullable: false })
  data!: SecretaryUpdateInput;
}

export { UpdateSecretaryArgs };
