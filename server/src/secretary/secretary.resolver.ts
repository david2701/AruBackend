import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SecretaryResolverBase } from "./base/secretary.resolver.base";
import { Secretary } from "./base/Secretary";
import { SecretaryService } from "./secretary.service";

@graphql.Resolver(() => Secretary)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SecretaryResolver extends SecretaryResolverBase {
  constructor(
    protected readonly service: SecretaryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
