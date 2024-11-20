import { IPostRepository } from "../../posts/repositories/post-repositories.interface";
import { PostNotFoundError } from "../../posts/use-cases/errors/post-not-found-error";
import { IUserRepository } from "../../users/repositories/user-repository.interface";
import { UserNotFoundError } from "../../users/use-cases/errors/user-not-found-error";
import { ICommentRepository } from "../repositories/comment-repositories.interface";



export interface CreateCommentInput {
    post_id: string;
    user_id: string;
    description: string;
  }
  
  export type CreateCommentOutput = Comment;
  
  export class CreateCommentUseCase {
    constructor(
      private commentRepository: ICommentRepository,
      private postRepository: IPostRepository,
      private userRepository: IUserRepository
    ) {}
  
    async execute(input: CreateCommentInput): Promise<any> {
      const user = await this.userRepository.findById(input.user_id);
      if (!user) {
        throw new UserNotFoundError();
      }
  
      const post = await this.postRepository.findById(input.post_id);
      if (!post) {
        throw new PostNotFoundError();
      }
  
      const comment = await this.commentRepository.insert({
        // post: input.post_id,
        // user_id: input.user_id,
        description: input.description,
        post: {
          connect: {id: input.post_id}
        }, 
        user: {
          connect: {
            id: input.user_id
          }
        }
      });
  
      return {
        post_id: comment.post_id,
        user_id: comment.user_id,
        description: comment.description
      };
    }
  }
  