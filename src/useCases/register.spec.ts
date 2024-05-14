import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

describe('Register Use Case', () => {
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
})