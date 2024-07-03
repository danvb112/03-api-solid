import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { randomUUID } from 'node:crypto';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(inMemoryCheckInsRepository);
    })

    it('should be able to register', async () => {
        const { checkIn } = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID(),
        });

        expect(checkIn.gym_id).toEqual(expect.any(String));
    })
})