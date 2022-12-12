import { ValidateTodoFields } from "./../../utils/validateTodoFIelds";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Todo } from "../todo.entity";
import { TodoMongoRepository } from "./../repos/implementations/mongo/todo.mongo.repository";

export class TodoServices {
  private repo;
  constructor() {
    this.repo = new TodoMongoRepository();
  }

  public async createTodo(todo: Todo): Promise<Result<any>> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: todo.name, argumentName: "name" },
      { argument: todo.description, argumentName: "description" },
      { argument: todo.importance, argumentName: "importance" },
    ]);

    if (guardResult.isFailure)
      return Result.fail(guardResult.getErrorValue() as string);

    const nameOrError = ValidateTodoFields.validateName(todo.name);
    const descriptionOrError = ValidateTodoFields.validateDescription(
      todo.description
    );
    const importanceOrError = ValidateTodoFields.validateImportance(
      todo.importance
    );

    const verifyFieldsResult = Result.combine([
      nameOrError,
      descriptionOrError,
      importanceOrError,
    ]);

    if (verifyFieldsResult.isFailure)
      return Result.fail(verifyFieldsResult.getErrorValue() as string);

    const name = nameOrError.getValue();
    const description = descriptionOrError.getValue();
    const importance = importanceOrError.getValue();

    try {
      const newTodo = await this.repo.save({ name, description, importance });
      return Result.ok(newTodo);
    } catch {
      return Result.fail("Todo Services:Error during todo creation");
    }
  }

  public async getAllTodos(): Promise<Result<any>> {
    try {
      const todos = await this.repo.getAll();
      return Result.ok(todos);
    } catch {
      return Result.fail("Todo services: Error during todos fetching");
    }
  }
}
