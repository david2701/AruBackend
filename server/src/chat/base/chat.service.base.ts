import { PrismaService } from "nestjs-prisma";
import { Prisma, Chat, Doctor, User } from "@prisma/client";

export class ChatServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ChatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatFindManyArgs>
  ): Promise<number> {
    return this.prisma.chat.count(args);
  }

  async findMany<T extends Prisma.ChatFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatFindManyArgs>
  ): Promise<Chat[]> {
    return this.prisma.chat.findMany(args);
  }
  async findOne<T extends Prisma.ChatFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatFindUniqueArgs>
  ): Promise<Chat | null> {
    return this.prisma.chat.findUnique(args);
  }
  async create<T extends Prisma.ChatCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatCreateArgs>
  ): Promise<Chat> {
    return this.prisma.chat.create<T>(args);
  }
  async update<T extends Prisma.ChatUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatUpdateArgs>
  ): Promise<Chat> {
    return this.prisma.chat.update<T>(args);
  }
  async delete<T extends Prisma.ChatDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChatDeleteArgs>
  ): Promise<Chat> {
    return this.prisma.chat.delete(args);
  }

  async getIdDoctor(parentId: string): Promise<Doctor | null> {
    return this.prisma.chat
      .findUnique({
        where: { id: parentId },
      })
      .idDoctor();
  }

  async getIdUser(parentId: string): Promise<User | null> {
    return this.prisma.chat
      .findUnique({
        where: { id: parentId },
      })
      .idUser();
  }
}
