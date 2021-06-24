import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SecretaryWhereInput } from "./SecretaryWhereInput";
import { Type } from "class-transformer";
import { SecretaryOrderByInput } from "./SecretaryOrderByInput";

@ArgsType()
class SecretaryFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SecretaryWhereInput,
  })
  @Field(() => SecretaryWhereInput, { nullable: true })
  @Type(() => SecretaryWhereInput)
  where?: SecretaryWhereInput;

  @ApiProperty({
    required: false,
    type: SecretaryOrderByInput,
  })
  @Field(() => SecretaryOrderByInput, { nullable: true })
  @Type(() => SecretaryOrderByInput)
  orderBy?: SecretaryOrderByInput;

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

export { SecretaryFindManyArgs };
