import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { DoctorResolverBase } from "./base/doctor.resolver.base";
import { Doctor } from "./base/Doctor";
import { DoctorService } from "./doctor.service";

@graphql.Resolver(() => Doctor)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DoctorResolver extends DoctorResolverBase {
  constructor(
    protected readonly service: DoctorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
