import { prisma } from "@/lib/prisma";
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

    await prisma.user.create({
        data: {
            email,
            name,
            password_hash,
        }
    });
}