import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DoctorWhereInput } from "./DoctorWhereInput";
import { Type } from "class-transformer";
import { DoctorOrderByInput } from "./DoctorOrderByInput";

@ArgsType()
class DoctorFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DoctorWhereInput,
  })
  @Field(() => DoctorWhereInput, { nullable: true })
  @Type(() => DoctorWhereInput)
  where?: DoctorWhereInput;

  @ApiProperty({
    required: false,
    type: DoctorOrderByInput,
  })
  @Field(() => DoctorOrderByInput, { nullable: true })
  @Type(() => DoctorOrderByInput)
  orderBy?: DoctorOrderByInput;

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

export { DoctorFindManyArgs };
