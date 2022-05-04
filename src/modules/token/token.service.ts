import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TokenCreateInput) {
    try {
      return await this.prisma.token.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.token.findMany();
    } catch (error) {
      return null;
    }
  }

  async findOne(where: Prisma.TokenWhereUniqueInput) {
    try {
      return await this.prisma.token.findUnique({ where });
    } catch (error) {
      return null;
    }
  }

  async update(
    where: Prisma.TokenWhereUniqueInput,
    data: Prisma.TokenUpdateInput,
  ) {
    const token = await this.findOne(where);
    if (token) {
      try {
        return await this.prisma.token.update({
          where: { id: token.id },
          data: data,
        });
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  async remove(where: Prisma.TokenWhereUniqueInput) {
    const token = await this.findOne(where);
    if (token) {
      try {
        return await this.prisma.token.delete({
          where: { id: token.id },
        });
      } catch (error) {
        return error;
      }
    }
    return null;
  }
}
