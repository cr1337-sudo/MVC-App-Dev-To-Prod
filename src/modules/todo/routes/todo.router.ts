import { TodoController } from "../controllers/todo.controller";
import { Router } from "express";
const TodoRouter = Router();


TodoRouter.route("/").post(TodoController.createTodo).get(TodoController.getTodos)

export default TodoRouter;
