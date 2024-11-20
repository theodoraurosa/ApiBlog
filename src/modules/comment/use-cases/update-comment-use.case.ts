import { ICommentRepository } from "../repositories/comment-repositories.interface";
import { CommentNotFoundError } from "./errors/comment-not-found-error";
import { Comment } from "@prisma/client";




export interface UpdateCommentInput {
    id: string;
    user_id?: string;
    post_id?: string;
    description?: string;
    updated_at?: Date;
  }
  
  export type UpdateCommentOutput = Comment;
  
  export class UpdateCommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}
  
    async execute(input: UpdateCommentInput): Promise<UpdateCommentOutput> {
      const comment = await this.commentRepository.findById(input.id);
  
      if (!comment) {
        throw new CommentNotFoundError();
      }
  
     
      comment.updated_at = new Date();
  
    
      const updatedComment = await this.commentRepository.update({ ...comment, ...input });
  
      return updatedComment;
    }
  }
  