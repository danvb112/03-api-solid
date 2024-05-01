import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseParams {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        name,
        password,
    }: RegisterUseCaseParams) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findUserByEmail(email);

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
