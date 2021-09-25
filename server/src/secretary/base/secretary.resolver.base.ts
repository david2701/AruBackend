import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateSecretaryArgs } from "./CreateSecretaryArgs";
import { UpdateSecretaryArgs } from "./UpdateSecretaryArgs";
import { DeleteSecretaryArgs } from "./DeleteSecretaryArgs";
import { SecretaryFindManyArgs } from "./SecretaryFindManyArgs";
import { SecretaryFindUniqueArgs } from "./SecretaryFindUniqueArgs";
import { Secretary } from "./Secretary";
import { SecretaryService } from "../secretary.service";

@graphql.Resolver(() => Secretary)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SecretaryResolverBase {
  constructor(
    protected readonly service: SecretaryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "read",
    possession: "any",
  })
  async _secretariesMeta(
    @graphql.Args() args: SecretaryFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Secretary])
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "read",
    possession: "any",
  })
  async secretaries(
    @graphql.Args() args: SecretaryFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Secretary[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Secretary",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Secretary, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "read",
    possession: "own",
  })
  async secretary(
    @graphql.Args() args: SecretaryFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Secretary | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Secretary",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Secretary)
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "create",
    possession: "any",
  })
  async createSecretary(
    @graphql.Args() args: CreateSecretaryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Secretary> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Secretary",
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
        `providing the properties: ${properties} on ${"Secretary"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Secretary)
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "update",
    possession: "any",
  })
  async updateSecretary(
    @graphql.Args() args: UpdateSecretaryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Secretary | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Secretary",
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
        `providing the properties: ${properties} on ${"Secretary"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Secretary)
  @nestAccessControl.UseRoles({
    resource: "Secretary",
    action: "delete",
    possession: "any",
  })
  async deleteSecretary(
    @graphql.Args() args: DeleteSecretaryArgs
  ): Promise<Secretary | null> {
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
