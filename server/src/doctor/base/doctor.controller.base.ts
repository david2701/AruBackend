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
import { DoctorService } from "../doctor.service";
import { DoctorCreateInput } from "./DoctorCreateInput";
import { DoctorWhereInput } from "./DoctorWhereInput";
import { DoctorWhereUniqueInput } from "./DoctorWhereUniqueInput";
import { DoctorFindManyArgs } from "./DoctorFindManyArgs";
import { DoctorUpdateInput } from "./DoctorUpdateInput";
import { Doctor } from "./Doctor";
import { AppointmentWhereInput } from "../../appointment/base/AppointmentWhereInput";
import { Appointment } from "../../appointment/base/Appointment";
import { ChatWhereInput } from "../../chat/base/ChatWhereInput";
import { Chat } from "../../chat/base/Chat";

export class DoctorControllerBase {
  constructor(
    protected readonly service: DoctorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Doctor })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: DoctorCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Doctor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Doctor",
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
        `providing the properties: ${properties} on ${"Doctor"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        clinic: true,
        createdAt: true,
        dateLastPacient: true,
        email: true,
        id: true,
        lastPacient: true,
        mobile: true,
        name: true,
        services: true,
        updatedAt: true,
        workHour: true,
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
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Doctor] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => DoctorFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Doctor[]> {
    const args = plainToClass(DoctorFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Doctor",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        clinic: true,
        createdAt: true,
        dateLastPacient: true,
        email: true,
        id: true,
        lastPacient: true,
        mobile: true,
        name: true,
        services: true,
        updatedAt: true,
        workHour: true,
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
    resource: "Doctor",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Doctor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: DoctorWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Doctor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Doctor",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        clinic: true,
        createdAt: true,
        dateLastPacient: true,
        email: true,
        id: true,
        lastPacient: true,
        mobile: true,
        name: true,
        services: true,
        updatedAt: true,
        workHour: true,
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
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Doctor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body()
    data: DoctorUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Doctor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
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
        `providing the properties: ${properties} on ${"Doctor"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          clinic: true,
          createdAt: true,
          dateLastPacient: true,
          email: true,
          id: true,
          lastPacient: true,
          mobile: true,
          name: true,
          services: true,
          updatedAt: true,
          workHour: true,
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
    resource: "Doctor",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Doctor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: DoctorWhereUniqueInput
  ): Promise<Doctor | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          clinic: true,
          createdAt: true,
          dateLastPacient: true,
          email: true,
          id: true,
          lastPacient: true,
          mobile: true,
          name: true,
          services: true,
          updatedAt: true,
          workHour: true,
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
  @common.Get("/:id/appointments")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => AppointmentWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyAppointments(
    @common.Req() request: Request,
    @common.Param() params: DoctorWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appointment[]> {
    const query: AppointmentWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appointment",
    });
    const results = await this.service.findAppointments(params.id, {
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
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/appointments")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async createAppointments(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      appointments: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/appointments")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async updateAppointments(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      appointments: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/appointments")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async deleteAppointments(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      appointments: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/chats")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => ChatWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyChats(
    @common.Req() request: Request,
    @common.Param() params: DoctorWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Chat[]> {
    const query: ChatWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Chat",
    });
    const results = await this.service.findChats(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,

        idDoctor: {
          select: {
            id: true,
          },
        },

        idUser: {
          select: {
            id: true,
          },
        },

        message: true,
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
  @common.Post("/:id/chats")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async createChats(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      chats: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/chats")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async updateChats(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      chats: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/chats")
  @nestAccessControl.UseRoles({
    resource: "Doctor",
    action: "update",
    possession: "any",
  })
  async deleteChats(
    @common.Param() params: DoctorWhereUniqueInput,
    @common.Body() body: DoctorWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      chats: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Doctor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Doctor"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
