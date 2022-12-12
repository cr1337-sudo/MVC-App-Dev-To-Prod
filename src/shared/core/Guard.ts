import { Result } from "./Result";

export type GuardResponse = string | null;

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(
    guardResults: Array<Result<any>>
  ): Result<GuardResponse> {
    for (const result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static greaterThan(
    minValue: number,
    actualValue: number
  ): Result<GuardResponse> {
    return actualValue > minValue
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(
          `Number given {${actualValue}} is not greater than {${minValue}}`
        );
  }

  public static againstAtLeast(
    numChars: number,
    text: string
  ): Result<GuardResponse> {
    return text.length >= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`);
  }

  public static againstAtMost(
    numChars: number,
    text: string
  ): Result<GuardResponse> {
    return text.length <= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`);
  }

  public static againstNaN(
    argument: any,
    argumentName: string
  ): Result<GuardResponse> {
    if (isNaN(Number(argument))) {
      return Result.fail<GuardResponse>(`${argumentName} is NaN`);
    }

    return Result.ok<GuardResponse>();
  }
  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Result.fail<GuardResponse>(
        `${argumentName} is not within range ${min} to ${max}.`
      );
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  public static againstEmptyString(
    argument: any,
    argumentName: string
  ): Result<GuardResponse> {
    if (String(argument).trim() === "") {
      return Result.fail<GuardResponse>(`${argumentName} is an empty string`);
    }

    return Result.ok<GuardResponse>();
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(`${argumentName} is null or undefined`);
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): Result<GuardResponse> {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }
}
