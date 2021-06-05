import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentWhereInput } from "./AppointmentWhereInput";
import { Type } from "class-transformer";
import { AppointmentOrderByInput } from "./AppointmentOrderByInput";

@ArgsType()
class AppointmentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => AppointmentWhereInput,
  })
  @Field(() => AppointmentWhereInput, { nullable: true })
  @Type(() => AppointmentWhereInput)
  where?: AppointmentWhereInput;

  @ApiProperty({
    required: false,
    type: AppointmentOrderByInput,
  })
  @Field(() => AppointmentOrderByInput, { nullable: true })
  @Type(() => AppointmentOrderByInput)
  orderBy?: AppointmentOrderByInput;

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

export { AppointmentFindManyArgs };
