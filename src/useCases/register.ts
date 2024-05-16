import { UsersRepository } from "@/repositories/users-repository";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseParams {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        name,
        password,
    }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
        const password_hash = await bcryptjs.hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findUserByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password_hash,
        });

        return {
            user
        }
    }
}
