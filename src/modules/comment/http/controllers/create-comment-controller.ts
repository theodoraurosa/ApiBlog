import { z } from "zod";
import { PostPrismaRepository } from "../../../posts/repositories/prisma/post-prisma.repository";
import { PostNotFoundError } from "../../../posts/use-cases/errors/post-not-found-error";
import { UserPrismaRepository } from "../../../users/repositories/prisma/user-prisma.repository";
import { UserNotFoundError } from "../../../users/use-cases/errors/user-not-found-error";
import { CommentPrismaRepository } from "../../repositories/prisma/comment-prisma-repository";
import { CreateCommentUseCase } from "../../use-cases/create-comment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";






export class CreateCommentController {
    constructor(private useCase: CreateCommentUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> {
      const input = createCommentValidated.parse(request.body);
  
      try {
        await this.useCase.execute(input);
      } catch (err) {
        if (err instanceof UserNotFoundError) {
          return reply.status(404).send({ message: err.message });
        }
  
        if (err instanceof PostNotFoundError) {
          return reply.status(404).send({ message: err.message });
        }
  
        throw err;
      }
  
      return reply.status(201).send();
    }
  }
  
  const createCommentValidated = z.object({
    user_id: z.string(),
    post_id: z.string(),
    description: z.string(),
  });
  
  export const createCommentFactory = new CreateCommentController(
    new CreateCommentUseCase(
      new CommentPrismaRepository(),
      new PostPrismaRepository(),
      new UserPrismaRepository(),
    )
  );
  