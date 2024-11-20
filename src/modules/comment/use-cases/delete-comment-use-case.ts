import { ICommentRepository } from "../repositories/comment-repositories.interface";
import { CommentNotFoundError } from "./errors/comment-not-found-error";








export interface DeleteCommentInput {
    id: string;
  }
  
  export type DeleteCommentOutput = void;
  
  export class DeleteCommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}
  
    async execute(input: DeleteCommentInput): Promise<DeleteCommentOutput> {
      const comment = await this.commentRepository.findById(input.id);
  
      if (!comment) {
        throw new CommentNotFoundError();
      }
  
      await this.commentRepository.delete(comment.id);
    }
  }
  
  