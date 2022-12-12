export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    private readonly _error: T | string | null;
    private readonly _value: T | null;

    public constructor(
        isSuccess: boolean,
        error: T | string | null = null,
        value: T | null = null,
    ) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._error = error;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }

        return this._value as T;
    }

    public getErrorValue(): T {
        return this._error as T;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, null, value);
    }

    public static fail<U>(error: string | U): Result<U> {
        if (!error) throw new Error("MissingArgument: An error argument must be provided ");
        return new Result<U>(false, error, null);
    }

    public static combine(results: Array<Result<any>>): Result<any> {
        for (const result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok();
    }
}