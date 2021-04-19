import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ConfigServiceBase } from "./base/config.service.base";

@Injectable()
export class ConfigService extends ConfigServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
