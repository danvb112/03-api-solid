import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCaseParams {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: any) { }

    async execute({
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

        await this.usersRepository.create({
            email,
            name,
            password_hash,
        })
    }
}
