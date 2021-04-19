import { ArgsType, Field } from "@nestjs/graphql";
import { ChatWhereUniqueInput } from "./ChatWhereUniqueInput";

@ArgsType()
class ChatFindUniqueArgs {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  where!: ChatWhereUniqueInput;
}

export { ChatFindUniqueArgs };
