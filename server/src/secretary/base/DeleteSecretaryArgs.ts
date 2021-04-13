import { ArgsType, Field } from "@nestjs/graphql";
import { SecretaryWhereUniqueInput } from "./SecretaryWhereUniqueInput";

@ArgsType()
class DeleteSecretaryArgs {
  @Field(() => SecretaryWhereUniqueInput, { nullable: false })
  where!: SecretaryWhereUniqueInput;
}

export { DeleteSecretaryArgs };
