import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

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
            throw new UserAlreadyExistsError();
        }

        await this.usersRepository.create({
            email,
            name,
            password_hash,
        })
    }
}
