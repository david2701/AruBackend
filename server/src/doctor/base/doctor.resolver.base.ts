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
import { CreateDoctorArgs } from "./CreateDoctorArgs";
import { UpdateDoctorArgs } from "./UpdateDoctorArgs";
import { DeleteDoctorArgs } from "./DeleteDoctorArgs";
import { DoctorFindManyArgs } from "./DoctorFindManyArgs";
import { DoctorFindUniqueArgs } from "./DoctorFindUniqueArgs";
import { Doctor } from "./Doctor";
import { AppointmentFindManyArgs } from "../../appointment/base/AppointmentFindManyArgs";
import { Appointment } from "../../appointment/base/Appointment";
import { ChatFindManyArgs } from "../../chat/base/ChatFindManyArgs";
import { Chat } from "../../chat/base/Chat";
import { DoctorService } from "../doctor.service";

@graphql.Resolver(() => Doctor)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class DoctorResolverBase {
  constructor(
    protected readonly service: DoctorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  async _doctorsMeta(
    @graphql.Args() args: DoctorFindManyArgs
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

  @graphql.Query(() => [Doctor])
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  async doctors(
    @graphql.Args() args: DoctorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Doctor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Doctor",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Doctor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "own",
  })
  async doctor(
    @graphql.Args() args: DoctorFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Doctor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Doctor",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Doctor)
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "create",
    possession: "any",
  })
  async createDoctor(
    @graphql.Args() args: CreateDoctorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Doctor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Doctor",
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
        `providing the properties: ${properties} on ${"Doctor"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Doctor)
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async updateDoctor(
    @graphql.Args() args: UpdateDoctorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Doctor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
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
        `providing the properties: ${properties} on ${"Doctor"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Doctor)
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "delete",
    possession: "any",
  })
  async deleteDoctor(
    @graphql.Args() args: DeleteDoctorArgs
  ): Promise<Doctor | null> {
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

  @graphql.ResolveField(() => [Appointment])
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  async appointments(
    @graphql.Parent() parent: Doctor,
    @graphql.Args() args: AppointmentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appointment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appointment",
    });
    const results = await this.service.findAppointments(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Chat])
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  async chats(
    @graphql.Parent() parent: Doctor,
    @graphql.Args() args: ChatFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chat[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Chat",
    });
    const results = await this.service.findChats(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
