import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';

import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    const student = Student.create({
      email: raw.email,
      name: raw.name,
      password: raw.password,
    }, new UniqueEntityID(raw.id));

    return student;
  }

  static toPersistence(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}


