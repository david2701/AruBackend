import { ArgsType, Field } from "@nestjs/graphql";
import { ChatWhereInput } from "./ChatWhereInput";

@ArgsType()
class ChatFindManyArgs {
  @Field(() => ChatWhereInput, { nullable: true })
  where?: ChatWhereInput;
}

export { ChatFindManyArgs };
