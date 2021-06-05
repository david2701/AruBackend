import { PrismaService } from "nestjs-prisma";
import { Prisma, Session } from "@prisma/client";

export class SessionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SessionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionFindManyArgs>
  ): Promise<number> {
    return this.prisma.session.count(args);
  }

  async findMany<T extends Prisma.SessionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionFindManyArgs>
  ): Promise<Session[]> {
    return this.prisma.session.findMany(args);
  }
  async findOne<T extends Prisma.SessionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionFindUniqueArgs>
  ): Promise<Session | null> {
    return this.prisma.session.findUnique(args);
  }
  async create<T extends Prisma.SessionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionCreateArgs>
  ): Promise<Session> {
    return this.prisma.session.create<T>(args);
  }
  async update<T extends Prisma.SessionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionUpdateArgs>
  ): Promise<Session> {
    return this.prisma.session.update<T>(args);
  }
  async delete<T extends Prisma.SessionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SessionDeleteArgs>
  ): Promise<Session> {
    return this.prisma.session.delete(args);
  }
}
