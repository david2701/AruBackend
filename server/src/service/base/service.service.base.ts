import { PrismaService } from "nestjs-prisma";
import { Prisma, Service } from "@prisma/client";

export class ServiceServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ServiceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceFindManyArgs>
  ): Promise<number> {
    return this.prisma.service.count(args);
  }

  async findMany<T extends Prisma.ServiceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceFindManyArgs>
  ): Promise<Service[]> {
    return this.prisma.service.findMany(args);
  }
  async findOne<T extends Prisma.ServiceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceFindUniqueArgs>
  ): Promise<Service | null> {
    return this.prisma.service.findUnique(args);
  }
  async create<T extends Prisma.ServiceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceCreateArgs>
  ): Promise<Service> {
    return this.prisma.service.create<T>(args);
  }
  async update<T extends Prisma.ServiceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceUpdateArgs>
  ): Promise<Service> {
    return this.prisma.service.update<T>(args);
  }
  async delete<T extends Prisma.ServiceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceDeleteArgs>
  ): Promise<Service> {
    return this.prisma.service.delete(args);
  }
}
