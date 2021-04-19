import { ArgsType, Field } from "@nestjs/graphql";
import { ChatCreateInput } from "./ChatCreateInput";

@ArgsType()
class CreateChatArgs {
  @Field(() => ChatCreateInput, { nullable: false })
  data!: ChatCreateInput;
}

export { CreateChatArgs };
