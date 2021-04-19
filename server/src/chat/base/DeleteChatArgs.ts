import { ArgsType, Field } from "@nestjs/graphql";
import { ChatWhereUniqueInput } from "./ChatWhereUniqueInput";

@ArgsType()
class DeleteChatArgs {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  where!: ChatWhereUniqueInput;
}

export { DeleteChatArgs };
