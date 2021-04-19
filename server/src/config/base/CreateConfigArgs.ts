import { ArgsType, Field } from "@nestjs/graphql";
import { ConfigCreateInput } from "./ConfigCreateInput";

@ArgsType()
class CreateConfigArgs {
  @Field(() => ConfigCreateInput, { nullable: false })
  data!: ConfigCreateInput;
}

export { CreateConfigArgs };
