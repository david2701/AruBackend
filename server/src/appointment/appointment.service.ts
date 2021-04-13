import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AppointmentServiceBase } from "./base/appointment.service.base";

@Injectable()
export class AppointmentService extends AppointmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
