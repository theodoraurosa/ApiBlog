import { FastifyReply, FastifyRequest } from "fastify";
import { CommentPrismaRepository } from "../../repositories/prisma/comment-prisma-repository";
import { DeleteCommentUseCase } from "../../use-cases/delete-comment-use-case";
import { CommentNotFoundError } from "../../use-cases/errors/comment-not-found-error";
import { z } from "zod";




export class DeleteCommentController {
    constructor(private commentCase: DeleteCommentUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = deleteCommentValidated.parse(request.params);
  
        await this.commentCase.execute(input);
  
        return reply.status(204).send();
      } catch (err) {
        if (err instanceof CommentNotFoundError) {
          return reply.status(404).send({ message: err.message });
        }
  
        throw err;
      }
    }
  }
  
  const deleteCommentValidated = z.object({
    id: z.string(),
  });
  
  export const deleteCommentFactory = new DeleteCommentController(
    new DeleteCommentUseCase(new CommentPrismaRepository()),
  );
  