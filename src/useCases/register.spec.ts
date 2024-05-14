import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const { user } = await registerUseCase.execute({
            name: 'John doe',
            email: 'johndoe@email.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    })

    it('should hash user password upon registration', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const { user } = await registerUseCase.execute({
            name: 'John doe',
            email: 'johndoe@email.com',
            password: '123456'
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true)
    });

    it('should not be able to register with same email twice', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const email = 'johndoe@email.com';

        await registerUseCase.execute({
            name: 'John doe',
            email,
            password: '123456'
        });

        await expect(
            registerUseCase.execute({
                name: 'John doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})