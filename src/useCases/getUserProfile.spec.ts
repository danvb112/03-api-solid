import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { GetUserProfile } from './getUserProfile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfile(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            email: 'johndoe@email.com',
            name: 'John Doe',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to get user profile with wrong id', async () => {
        await expect(
            sut.execute({
                userId: 'not-existed-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
})