import { FastifyReply, FastifyRequest } from "fastify"
import { UpdateCommentUseCase } from "../../use-cases/update-comment-use.case"
import { CommentPrismaRepository } from "../../repositories/prisma/comment-prisma-repository"
import { CommentAlreadyExistsError } from "../../use-cases/errors/comment-already-exist-error"
import { CommentNotFoundError } from "../../use-cases/errors/comment-not-found-error"
import { z } from "zod"






export class UpdateCommentController {
    constructor(private useCase: UpdateCommentUseCase) {}
  
    async handle(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<FastifyReply> {
      try {
        const input = updateCommentValidated.parse({
          ...(request.params as FastifyRequest),
          ...(request.body as FastifyRequest),
        })
  
        const output = await this.useCase.execute(input)
  
        return reply.status(200).send({
          data: {
            ...output,
            password: undefined,
          },
        })
      } catch (err) {
        if (err instanceof CommentAlreadyExistsError) {
          return reply.status(409).send({ message: err.message })
        }
  
        if (err instanceof CommentNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }
  
        throw err
      }
    }
  }
  
  const updateCommentValidated = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['admin', 'user']).optional(),
  })
  
  export const updateCommentFactory = new UpdateCommentController(
    new UpdateCommentUseCase(new CommentPrismaRepository()),
  )
  