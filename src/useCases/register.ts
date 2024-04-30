import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseParams {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({
    email,
    name,
    password,
}: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (userWithSameEmail) {
        throw new Error('User already exists.')
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        email,
        name,
        password_hash,
    })
}