import { InvalidCredentialsError } from "@/useCases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/useCases/factories/makeAuthenticateUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        await authenticateUseCase.execute({
            email,
            password
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error;
    }

    return reply.status(200).send()
}