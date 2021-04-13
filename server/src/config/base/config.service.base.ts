import { PrismaService } from "nestjs-prisma";
import { Prisma, Config } from "@prisma/client";

export class ConfigServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.ConfigFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ConfigFindManyArgs>
  ): Promise<Config[]> {
    return this.prisma.config.findMany(args);
  }
  async findOne<T extends Prisma.ConfigFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ConfigFindUniqueArgs>
  ): Promise<Config | null> {
    return this.prisma.config.findUnique(args);
  }
  async create<T extends Prisma.ConfigCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ConfigCreateArgs>
  ): Promise<Config> {
    return this.prisma.config.create<T>(args);
  }
  async update<T extends Prisma.ConfigUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ConfigUpdateArgs>
  ): Promise<Config> {
    return this.prisma.config.update<T>(args);
  }
  async delete<T extends Prisma.ConfigDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ConfigDeleteArgs>
  ): Promise<Config> {
    return this.prisma.config.delete(args);
  }
}
