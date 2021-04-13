import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { ConfigService } from "../config.service";
import { ConfigCreateInput } from "./ConfigCreateInput";
import { ConfigWhereInput } from "./ConfigWhereInput";
import { ConfigWhereUniqueInput } from "./ConfigWhereUniqueInput";
import { ConfigUpdateInput } from "./ConfigUpdateInput";
import { Config } from "./Config";

export class ConfigControllerBase {
  constructor(
    protected readonly service: ConfigService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Config })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ConfigCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Config> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Config",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Config"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Config] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ConfigWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Config[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Config",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Config })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ConfigWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Config | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Config",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Config })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ConfigWhereUniqueInput,
    @common.Body()
    data: ConfigUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Config | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Config",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Config"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          apiKeyZoom: true,
          apiPaypal: true,
          apiSecretZoom: true,
          apsStripe: true,
          apStripe: true,
          createdAt: true,
          fmc_Firebase: true,
          id: true,
          push: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Config })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ConfigWhereUniqueInput
  ): Promise<Config | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          apiKeyZoom: true,
          apiPaypal: true,
          apiSecretZoom: true,
          apsStripe: true,
          apStripe: true,
          createdAt: true,
          fmc_Firebase: true,
          id: true,
          push: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
