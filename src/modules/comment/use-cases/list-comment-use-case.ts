import { ICommentRepository } from "../repositories/comment-repositories.interface";
import { Comment } from "@prisma/client";

export interface ListCommentInput {
  post_id: string;
}

export type ListcommentOutput = Comment[];

export class ListCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async execute(input: ListCommentInput): Promise<ListcommentOutput> {
    const comment = await this.commentRepository.findByPostId(input.post_id);

    return comment;
  }
}
