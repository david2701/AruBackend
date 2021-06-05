import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ChatWhereInput } from "./ChatWhereInput";
import { Type } from "class-transformer";
import { ChatOrderByInput } from "./ChatOrderByInput";

@ArgsType()
class ChatFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ChatWhereInput,
  })
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @ApiProperty({
    required: false,
    type: ChatOrderByInput,
  })
  @Field(() => ChatOrderByInput, { nullable: true })
  @Type(() => ChatOrderByInput)
  orderBy?: ChatOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ChatFindManyArgs };
