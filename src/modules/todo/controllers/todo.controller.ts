import { Guard } from "./../../../shared/core/Guard";
import { Request, Response } from "express";
import { todoServices } from "../services";

export class TodoController {
  static async createTodo(req: Request, res: Response) {
    const { name, description, importance } = req.body;
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: name, argumentName: "name" },
      { argument: description, argumentName: "description" },
      { argument: importance, argumentName: "importance" },
    ]);

    if (guardResult.isFailure) {
      return res.status(400).json({
        success: false,
        data: null,
        error: guardResult.getErrorValue(),
      });
    }

    try {
      const todoOrError = await todoServices.createTodo(req.body);
      if (todoOrError.isFailure) {
        return res.status(400).json({
          success: false,
          data: null,
          error: todoOrError.getErrorValue(),
        });
      }

      return res.status(201).json({
        success: true,
        data: todoOrError.getValue(),
        error: null,
      });
    } catch {
      return res.status(500).json({
        success: false,
        data: null,
        error: "Todo controller:Unknown error",
      });
    }
  }

  static async getTodos(_:Request, res: Response) {
    try {
      const todosOrError = await todoServices.getAllTodos();
      if (todosOrError.isFailure) {
        return res.status(500).json({
          success: false,
          data: null,
          error: "Todo controller:Unknown error",
        });
      }
      return res.status(200).json({
        success: true,
        data: todosOrError.getValue(),
        error: null,
      });
    } catch {
      return res.status(500).json({
        success: true,
        data: null,
        error: "Todo controller: Unknown error",
      });
    }
  }
}
