import { ArgsType, Field } from "@nestjs/graphql";
import { ChatWhereUniqueInput } from "./ChatWhereUniqueInput";
import { ChatUpdateInput } from "./ChatUpdateInput";

@ArgsType()
class UpdateChatArgs {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  where!: ChatWhereUniqueInput;
  @Field(() => ChatUpdateInput, { nullable: false })
  data!: ChatUpdateInput;
}

export { UpdateChatArgs };
