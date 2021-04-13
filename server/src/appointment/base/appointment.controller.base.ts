import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { AppointmentService } from "../appointment.service";
import { AppointmentCreateInput } from "./AppointmentCreateInput";
import { AppointmentWhereInput } from "./AppointmentWhereInput";
import { AppointmentWhereUniqueInput } from "./AppointmentWhereUniqueInput";
import { AppointmentUpdateInput } from "./AppointmentUpdateInput";
import { Appointment } from "./Appointment";

export class AppointmentControllerBase {
  constructor(
    protected readonly service: AppointmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Appointment })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: AppointmentCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appointment> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Appointment",
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
        `providing the properties: ${properties} on ${"Appointment"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        doctorId: data.doctorId
          ? {
              connect: data.doctorId,
            }
          : undefined,

        pacient: data.pacient
          ? {
              connect: data.pacient,
            }
          : undefined,
      },
      select: {
        clinic: true,
        createdAt: true,
        date: true,

        doctorId: {
          select: {
            id: true,
          },
        },

        history: true,
        id: true,
        services: true,
        updatedAt: true,

        pacient: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Appointment] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: AppointmentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appointment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appointment",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        clinic: true,
        createdAt: true,
        date: true,

        doctorId: {
          select: {
            id: true,
          },
        },

        history: true,
        id: true,
        services: true,
        updatedAt: true,

        pacient: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Appointment",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Appointment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: AppointmentWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appointment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Appointment",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        clinic: true,
        createdAt: true,
        date: true,

        doctorId: {
          select: {
            id: true,
          },
        },

        history: true,
        id: true,
        services: true,
        updatedAt: true,

        pacient: {
          select: {
            id: true,
          },
        },
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
    resource: "Appointment",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Appointment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: AppointmentWhereUniqueInput,
    @common.Body()
    data: AppointmentUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appointment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Appointment",
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
        `providing the properties: ${properties} on ${"Appointment"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          doctorId: data.doctorId
            ? {
                connect: data.doctorId,
              }
            : undefined,

          pacient: data.pacient
            ? {
                connect: data.pacient,
              }
            : undefined,
        },
        select: {
          clinic: true,
          createdAt: true,
          date: true,

          doctorId: {
            select: {
              id: true,
            },
          },

          history: true,
          id: true,
          services: true,
          updatedAt: true,

          pacient: {
            select: {
              id: true,
            },
          },
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
    resource: "Appointment",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Appointment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: AppointmentWhereUniqueInput
  ): Promise<Appointment | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          clinic: true,
          createdAt: true,
          date: true,

          doctorId: {
            select: {
              id: true,
            },
          },

          history: true,
          id: true,
          services: true,
          updatedAt: true,

          pacient: {
            select: {
              id: true,
            },
          },
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
