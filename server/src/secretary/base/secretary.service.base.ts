import { PrismaService } from "nestjs-prisma";
import { Prisma, Secretary } from "@prisma/client";

export class SecretaryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.SecretaryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SecretaryFindManyArgs>
  ): Promise<Secretary[]> {
    return this.prisma.secretary.findMany(args);
  }
  async findOne<T extends Prisma.SecretaryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SecretaryFindUniqueArgs>
  ): Promise<Secretary | null> {
    return this.prisma.secretary.findUnique(args);
  }
  async create<T extends Prisma.SecretaryCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SecretaryCreateArgs>
  ): Promise<Secretary> {
    return this.prisma.secretary.create<T>(args);
  }
  async update<T extends Prisma.SecretaryUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SecretaryUpdateArgs>
  ): Promise<Secretary> {
    return this.prisma.secretary.update<T>(args);
  }
  async delete<T extends Prisma.SecretaryDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SecretaryDeleteArgs>
  ): Promise<Secretary> {
    return this.prisma.secretary.delete(args);
  }
}
