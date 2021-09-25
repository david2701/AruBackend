import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ConfigService } from "../config.service";
import { ConfigCreateInput } from "./ConfigCreateInput";
import { ConfigWhereInput } from "./ConfigWhereInput";
import { ConfigWhereUniqueInput } from "./ConfigWhereUniqueInput";
import { ConfigFindManyArgs } from "./ConfigFindManyArgs";
import { ConfigUpdateInput } from "./ConfigUpdateInput";
import { Config } from "./Config";

export class ConfigControllerBase {
  constructor(
    protected readonly service: ConfigService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Config })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
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
    return await this.service.create({
      data: data,
      select: {
        apiAgora: true,
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        pushTag: true,
        timeRefresh: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Config] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ConfigFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Config[]> {
    const args = plainToClass(ConfigFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Config",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        apiAgora: true,
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        pushTag: true,
        timeRefresh: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
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
      where: params,
      select: {
        apiAgora: true,
        apiKeyZoom: true,
        apiPaypal: true,
        apiSecretZoom: true,
        apsStripe: true,
        apStripe: true,
        createdAt: true,
        fmc_Firebase: true,
        id: true,
        push: true,
        pushTag: true,
        timeRefresh: true,
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
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
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
      return await this.service.update({
        where: params,
        data: data,
        select: {
          apiAgora: true,
          apiKeyZoom: true,
          apiPaypal: true,
          apiSecretZoom: true,
          apsStripe: true,
          apStripe: true,
          createdAt: true,
          fmc_Firebase: true,
          id: true,
          push: true,
          pushTag: true,
          timeRefresh: true,
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
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
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
    @common.Param() params: ConfigWhereUniqueInput
  ): Promise<Config | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          apiAgora: true,
          apiKeyZoom: true,
          apiPaypal: true,
          apiSecretZoom: true,
          apsStripe: true,
          apStripe: true,
          createdAt: true,
          fmc_Firebase: true,
          id: true,
          push: true,
          pushTag: true,
          timeRefresh: true,
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
