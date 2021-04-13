import { ArgsType, Field } from "@nestjs/graphql";
import { ConfigWhereUniqueInput } from "./ConfigWhereUniqueInput";
import { ConfigUpdateInput } from "./ConfigUpdateInput";

@ArgsType()
class UpdateConfigArgs {
  @Field(() => ConfigWhereUniqueInput, { nullable: false })
  where!: ConfigWhereUniqueInput;
  @Field(() => ConfigUpdateInput, { nullable: false })
  data!: ConfigUpdateInput;
}

export { UpdateConfigArgs };
