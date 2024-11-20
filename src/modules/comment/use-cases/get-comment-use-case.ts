

import { ICommentRepository } from "../repositories/comment-repositories.interface";
import { CommentNotFoundError } from "./errors/comment-not-found-error";
import { Comment } from "@prisma/client";



export interface GetCommentInput {
  id: string;
}

export type GetCommentOutput = Comment[];

export class GetCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(input: GetCommentInput): Promise<GetCommentOutput> {
    const comment = await this.commentRepository.findByPostId(input.id);

    if (!comment) {
      throw new CommentNotFoundError();
    }

    return comment
  }
}
