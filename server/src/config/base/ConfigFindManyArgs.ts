import { ArgsType, Field } from "@nestjs/graphql";
import { ConfigWhereInput } from "./ConfigWhereInput";

@ArgsType()
class ConfigFindManyArgs {
  @Field(() => ConfigWhereInput, { nullable: true })
  where?: ConfigWhereInput;
}

export { ConfigFindManyArgs };
