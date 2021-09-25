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
import { CreateAppointmentArgs } from "./CreateAppointmentArgs";
import { UpdateAppointmentArgs } from "./UpdateAppointmentArgs";
import { DeleteAppointmentArgs } from "./DeleteAppointmentArgs";
import { AppointmentFindManyArgs } from "./AppointmentFindManyArgs";
import { AppointmentFindUniqueArgs } from "./AppointmentFindUniqueArgs";
import { Appointment } from "./Appointment";
import { Doctor } from "../../doctor/base/Doctor";
import { User } from "../../user/base/User";
import { AppointmentService } from "../appointment.service";

@graphql.Resolver(() => Appointment)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class AppointmentResolverBase {
  constructor(
    protected readonly service: AppointmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "any",
  })
  async _appointmentsMeta(
    @graphql.Args() args: AppointmentFindManyArgs
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

  @graphql.Query(() => [Appointment])
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "any",
  })
  async appointments(
    @graphql.Args() args: AppointmentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appointment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appointment",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Appointment, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "own",
  })
  async appointment(
    @graphql.Args() args: AppointmentFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appointment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Appointment",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Appointment)
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "create",
    possession: "any",
  })
  async createAppointment(
    @graphql.Args() args: CreateAppointmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appointment> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Appointment",
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
        `providing the properties: ${properties} on ${"Appointment"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        doctorId: args.data.doctorId
          ? {
              connect: args.data.doctorId,
            }
          : undefined,

        pacient: args.data.pacient
          ? {
              connect: args.data.pacient,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Appointment)
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "update",
    possession: "any",
  })
  async updateAppointment(
    @graphql.Args() args: UpdateAppointmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appointment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Appointment",
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
        `providing the properties: ${properties} on ${"Appointment"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          doctorId: args.data.doctorId
            ? {
                connect: args.data.doctorId,
              }
            : undefined,

          pacient: args.data.pacient
            ? {
                connect: args.data.pacient,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => Appointment)
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "delete",
    possession: "any",
  })
  async deleteAppointment(
    @graphql.Args() args: DeleteAppointmentArgs
  ): Promise<Appointment | null> {
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

  @graphql.ResolveField(() => Doctor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "any",
  })
  async doctorId(
    @graphql.Parent() parent: Appointment,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Doctor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Doctor",
    });
    const result = await this.service.getDoctorId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "any",
  })
  async pacient(
    @graphql.Parent() parent: Appointment,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getPacient(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
