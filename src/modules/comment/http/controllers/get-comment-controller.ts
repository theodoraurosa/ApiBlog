import { FastifyReply, FastifyRequest } from "fastify";
import { CommentPrismaRepository } from "../../repositories/prisma/comment-prisma-repository";
import { CommentNotFoundError } from "../../use-cases/errors/comment-not-found-error";
import { GetCommentUseCase } from "../../use-cases/get-comment-use-case";
import { z } from "zod";





export class GetCommentController {
    constructor(private commentCase: GetCommentUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = getCommentValidated.parse(request.params);
  
        const output = await this.commentCase.execute(input);
  
        return reply.status(200).send({
          data: {
            ...output,
        
          },
        });
      } catch (err) {
        if (err instanceof CommentNotFoundError) {
          return reply.status(404).send({ message: err.message });
        }
  
        throw err;
      }
    }
  }
  
  const getCommentValidated = z.object({
    id: z.string(),
  });
  
  export const getCommentFactory = new GetCommentController(
    new GetCommentUseCase(new CommentPrismaRepository()),
  );
  