import { UserRepository } from '@/backend/domain/customer/repositories/user-repository';
import { PrismaUserMapper } from '@/backend/infra/database/prisma/mappers/prisma-user-mapper';

import { User } from '@/backend/domain/customer/entities/user';

import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }
    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {id},
        });

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        
        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }

    async findByResetToken(token: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
            },
        });

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }    

    async create(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);

        const createdUser = await this.prisma.user.create({
            data: {
              ...userData,
            },
        });

        return PrismaUserMapper.toDomain(createdUser);
    }

    async save(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);

        const updatedUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
              ...userData,
            },
        });

        return PrismaUserMapper.toDomain(updatedUser);
    }
}
