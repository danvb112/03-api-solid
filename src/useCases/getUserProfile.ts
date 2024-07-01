import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileRequest {
    userId: string;
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfile {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        userId
    }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const user = await this.usersRepository.findUserById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user,
        }
    }
}