import { Prisma, Comment } from "@prisma/client";
import {
  ICommentRepository,
} from "../comment-repositories.interface";
import { prisma } from "../../../../lib/prisma";

export class CommentPrismaRepository implements ICommentRepository {
  

  async insert(data: Prisma.CommentCreateInput): Promise<Comment> {
    
    const model = await prisma.comment.create({
      data
    })

    return model
  }

  async findById(id: string): Promise<Comment | null> {
   const model = await prisma.comment.findUnique({
     where: {
      id,
     },

   });
   return model ?? null
  }

  async findByPostId(post_id: string): Promise<Comment[]> {
    const models = await prisma.comment.findMany({
      where: {
        post_id
      }
    })

    return models
  }

  async update(data: Comment): Promise<Comment> {
    const models = prisma.comment.update({
     where: {
      id: data.id,
     },
     data,
    })

    return models;
  }

  async delete(id: string): Promise<void> {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
  }
 
}
