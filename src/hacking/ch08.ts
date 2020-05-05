export type Callback<T> = {
  (err: null, result: T): void;
  (err: Error, result?: null): void;
};
type WithCallback<T, R> = (arg: T, cb: Callback<R>) => void;
type Promised<T, R> = (arg: T) => Promise<R>;

export function promisify<T, R>(fn: WithCallback<T, R>): Promised<T, R> {
  return (t): Promise<R> =>
    new Promise<R>((resolve, reject) =>
      fn(t, (err: Error | null, result: R | null | undefined): void => {
        if (err != null) reject(err);
        else resolve(result as R); // TODO: Get rid of "as R"?
      }),
    );
}
