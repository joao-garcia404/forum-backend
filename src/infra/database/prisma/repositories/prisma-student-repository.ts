import { Injectable } from '@nestjs/common';

import { Student } from '@/domain/forum/enterprise/entities/student';

import { PrismaService } from '../prisma.service';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';

import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findByEmail(email: string){
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!student) return null;

    return PrismaStudentMapper.toDomain(student);
  }

  async create(student: Student) {
    const data = PrismaStudentMapper.toPersistence(student);

    await this.prisma.user.create({
      data,
    });
  }

  async save(student: Student) {
    const data = PrismaStudentMapper.toPersistence(student);

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(student: Student) {
    const data = PrismaStudentMapper.toPersistence(student);

    await this.prisma.user.delete({
      where: {
        id: data.id,
      }
    });
  }
}
