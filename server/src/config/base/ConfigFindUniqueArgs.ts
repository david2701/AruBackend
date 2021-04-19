import { ArgsType, Field } from "@nestjs/graphql";
import { ConfigWhereUniqueInput } from "./ConfigWhereUniqueInput";

@ArgsType()
class ConfigFindUniqueArgs {
  @Field(() => ConfigWhereUniqueInput, { nullable: false })
  where!: ConfigWhereUniqueInput;
}

export { ConfigFindUniqueArgs };
