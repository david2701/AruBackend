import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ConfigService } from "./config.service";
import { ConfigControllerBase } from "./base/config.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("configs")
@common.Controller("configs")
export class ConfigController extends ConfigControllerBase {
  constructor(
    protected readonly service: ConfigService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
