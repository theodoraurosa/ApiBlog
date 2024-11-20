import { FastifyReply, FastifyRequest } from "fastify";
import { CollectionPresenter } from "../../../../utils/collection-presenter";
import { CommentPrismaRepository } from "../../repositories/prisma/comment-prisma-repository";
import { z } from "zod";
import { ListCommentUseCase } from "../../use-cases/list-comment-use-case";


export class ListCommentController {
    constructor(private commentCase: ListCommentUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      const input = listCommentValidated.parse(request.params);
  
      const outputArray = await this.commentCase.execute(input);
  
      return reply.status(200).send(outputArray);
    }
  }
  
  const listCommentValidated = z.object({
    post_id: z.string(),

  });
  
  export const listCommentFactory = new ListCommentController(
    new ListCommentUseCase(new CommentPrismaRepository()),
  );
  