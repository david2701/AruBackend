import { ArgsType, Field } from "@nestjs/graphql";
import { SecretaryCreateInput } from "./SecretaryCreateInput";

@ArgsType()
class CreateSecretaryArgs {
  @Field(() => SecretaryCreateInput, { nullable: false })
  data!: SecretaryCreateInput;
}

export { CreateSecretaryArgs };
