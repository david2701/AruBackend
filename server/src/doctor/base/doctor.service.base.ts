import { PrismaService } from "nestjs-prisma";
import { Prisma, Doctor, Appointment, Chat } from "@prisma/client";

export class DoctorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DoctorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorFindManyArgs>
  ): Promise<number> {
    return this.prisma.doctor.count(args);
  }

  async findMany<T extends Prisma.DoctorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorFindManyArgs>
  ): Promise<Doctor[]> {
    return this.prisma.doctor.findMany(args);
  }
  async findOne<T extends Prisma.DoctorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorFindUniqueArgs>
  ): Promise<Doctor | null> {
    return this.prisma.doctor.findUnique(args);
  }
  async create<T extends Prisma.DoctorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorCreateArgs>
  ): Promise<Doctor> {
    return this.prisma.doctor.create<T>(args);
  }
  async update<T extends Prisma.DoctorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorUpdateArgs>
  ): Promise<Doctor> {
    return this.prisma.doctor.update<T>(args);
  }
  async delete<T extends Prisma.DoctorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DoctorDeleteArgs>
  ): Promise<Doctor> {
    return this.prisma.doctor.delete(args);
  }

  async findAppointments(
    parentId: string,
    args: Prisma.AppointmentFindManyArgs
  ): Promise<Appointment[]> {
    return this.prisma.doctor
      .findUnique({
        where: { id: parentId },
      })
      .appointments(args);
  }

  async findChats(
    parentId: string,
    args: Prisma.ChatFindManyArgs
  ): Promise<Chat[]> {
    return this.prisma.doctor
      .findUnique({
        where: { id: parentId },
      })
      .chats(args);
  }
}
