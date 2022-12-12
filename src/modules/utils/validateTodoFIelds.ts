import { Result } from "../../shared/core/Result";
import { Guard } from "../../shared/core/Guard";

export class ValidateTodoFields {
  static validateName(name: string): Result<any> {
    const nameMaxLength = 50;
    const nameMinLength = 5;
    const againstUndefined = Guard.againstNullOrUndefined(name, "name");
    if (againstUndefined.isFailure)
      return Result.fail<string>(againstUndefined.getErrorValue() as string);

    const againstAtLeast = Guard.againstAtLeast(nameMinLength, name);
    if (againstAtLeast.isFailure)
      return Result.fail<string>(againstAtLeast.getErrorValue() as string);

    const againstAtMost = Guard.againstAtMost(nameMaxLength, name);
    if (againstAtMost.isFailure)
      return Result.fail<string>(againstAtMost.getErrorValue() as string);

    return Result.ok<string>(name);
  }

  static validateDescription(description: string): Result<any> {
    const nameMaxLength = 80;
    const nameMinLength = 5;
    const againstUndefined = Guard.againstNullOrUndefined(
      description,
      "description"
    );
    if (againstUndefined.isFailure)
      return Result.fail<string>(againstUndefined.getErrorValue() as string);

    const againstAtLeast = Guard.againstAtLeast(nameMinLength, description);
    if (againstAtLeast.isFailure)
      return Result.fail<string>(againstAtLeast.getErrorValue() as string);

    const againstAtMost = Guard.againstAtMost(nameMaxLength, description);
    if (againstAtMost.isFailure)
      return Result.fail<string>(againstAtMost.getErrorValue() as string);

    return Result.ok<string>(description);
  }

  static validateImportance(importance: number): Result<any> {
    const maxImportance = 10;
    const minImportance = 1;
    const againstNaN = Guard.againstNaN(importance, "importance");
    if (againstNaN.isFailure)
      return Result.fail<string>(againstNaN.getErrorValue() as string);

    const isInRange = Guard.inRange(
      importance,
      minImportance,
      maxImportance,
      "importance"
    );
    if (isInRange.isFailure)
      return Result.fail<string>(isInRange.getErrorValue() as string);

    return Result.ok<number>(importance);
  }
}
