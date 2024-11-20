export class CommentAlreadyExistsError extends Error {
    constructor() {
      super('Comment already exists.')
    }
  }