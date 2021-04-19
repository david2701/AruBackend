import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SecretaryService } from "./secretary.service";
import { SecretaryControllerBase } from "./base/secretary.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("secretaries")
@common.Controller("secretaries")
export class SecretaryController extends SecretaryControllerBase {
  constructor(
    protected readonly service: SecretaryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
