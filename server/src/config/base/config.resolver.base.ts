import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateConfigArgs } from "./CreateConfigArgs";
import { UpdateConfigArgs } from "./UpdateConfigArgs";
import { DeleteConfigArgs } from "./DeleteConfigArgs";
import { ConfigFindManyArgs } from "./ConfigFindManyArgs";
import { ConfigFindUniqueArgs } from "./ConfigFindUniqueArgs";
import { Config } from "./Config";
import { ConfigService } from "../config.service";

@graphql.Resolver(() => Config)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ConfigResolverBase {
  constructor(
    protected readonly service: ConfigService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Config])
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "read",
    possession: "any",
  })
  async configs(
    @graphql.Args() args: ConfigFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Config[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Config",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Config, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "read",
    possession: "own",
  })
  async config(
    @graphql.Args() args: ConfigFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Config | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Config",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Config)
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "create",
    possession: "any",
  })
  async createConfig(
    @graphql.Args() args: CreateConfigArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Config> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Config",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Config"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Config)
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "update",
    possession: "any",
  })
  async updateConfig(
    @graphql.Args() args: UpdateConfigArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Config | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Config",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Config"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Config)
  @nestAccessControl.UseRoles({
    resource: "Config",
    action: "delete",
    possession: "any",
  })
  async deleteConfig(
    @graphql.Args() args: DeleteConfigArgs
  ): Promise<Config | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
