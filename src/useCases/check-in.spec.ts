import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { randomUUID } from 'node:crypto';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(inMemoryCheckInsRepository);

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to register', async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId: randomUUID(),
        });

        expect(checkIn.gym_id).toEqual(expect.any(String));
    })

    it('should be not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const userId = randomUUID();

        await sut.execute({
            gymId: "gym-01",
            userId,
        });

        await expect(() =>
            sut.execute({
                gymId: "gym-01",
                userId,
            })
        ).rejects.toBeInstanceOf(Error);
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const userId = randomUUID();

        await sut.execute({
            gymId: "gym-01",
            userId,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    })
})