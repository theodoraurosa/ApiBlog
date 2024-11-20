import { FastifyInstance } from "fastify"
import { createCommentFactory } from "./controllers/create-comment-controller"
import { listCommentFactory } from "./controllers/list-comment-controller"
import { getCommentFactory } from "./controllers/get-comment-controller"
import { deleteCommentFactory } from "./controllers/delete-comment-controller"
import { updateCommentFactory } from "./controllers/upadate-comment-controller"






export async function commentRoutes(app: FastifyInstance) {
    app.post('/comments', (req, res) => createCommentFactory.handle(req, res))
    app.get('/comments', (req, res) => listCommentFactory.handle(req, res))
    app.get('/comments/:id', (req, res) => getCommentFactory.handle(req, res))
    app.patch('/comments/:id', (req, res) => updateCommentFactory.handle(req, res))
    app.delete('/comments/:id', (req, res) => deleteCommentFactory.handle(req, res))
  }