import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({
        gymId,
        userId,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInOnSameDate = await this.checkInsRepository.findUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOnSameDate) {
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}