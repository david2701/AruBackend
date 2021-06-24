import { PrismaService } from "nestjs-prisma";
import { Prisma, Appointment, Doctor, User } from "@prisma/client";

export class AppointmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AppointmentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentFindManyArgs>
  ): Promise<number> {
    return this.prisma.appointment.count(args);
  }

  async findMany<T extends Prisma.AppointmentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentFindManyArgs>
  ): Promise<Appointment[]> {
    return this.prisma.appointment.findMany(args);
  }
  async findOne<T extends Prisma.AppointmentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentFindUniqueArgs>
  ): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique(args);
  }
  async create<T extends Prisma.AppointmentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentCreateArgs>
  ): Promise<Appointment> {
    return this.prisma.appointment.create<T>(args);
  }
  async update<T extends Prisma.AppointmentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentUpdateArgs>
  ): Promise<Appointment> {
    return this.prisma.appointment.update<T>(args);
  }
  async delete<T extends Prisma.AppointmentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppointmentDeleteArgs>
  ): Promise<Appointment> {
    return this.prisma.appointment.delete(args);
  }

  async getDoctorId(parentId: string): Promise<Doctor | null> {
    return this.prisma.appointment
      .findUnique({
        where: { id: parentId },
      })
      .doctorId();
  }

  async getPacient(parentId: string): Promise<User | null> {
    return this.prisma.appointment
      .findUnique({
        where: { id: parentId },
      })
      .pacient();
  }
}
