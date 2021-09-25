import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ConfigWhereInput } from "./ConfigWhereInput";
import { Type } from "class-transformer";
import { ConfigOrderByInput } from "./ConfigOrderByInput";

@ArgsType()
class ConfigFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ConfigWhereInput,
  })
  @Field(() => ConfigWhereInput, { nullable: true })
  @Type(() => ConfigWhereInput)
  where?: ConfigWhereInput;

  @ApiProperty({
    required: false,
    type: ConfigOrderByInput,
  })
  @Field(() => ConfigOrderByInput, { nullable: true })
  @Type(() => ConfigOrderByInput)
  orderBy?: ConfigOrderByInput;

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

export { ConfigFindManyArgs };
