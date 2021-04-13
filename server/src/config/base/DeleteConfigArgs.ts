import { ArgsType, Field } from "@nestjs/graphql";
import { ConfigWhereUniqueInput } from "./ConfigWhereUniqueInput";

@ArgsType()
class DeleteConfigArgs {
  @Field(() => ConfigWhereUniqueInput, { nullable: false })
  where!: ConfigWhereUniqueInput;
}

export { DeleteConfigArgs };
