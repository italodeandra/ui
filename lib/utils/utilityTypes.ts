/* istanbul ignore file */

/**
 * Makes the type Partial (all properties optional) deeply (recursively on all
 * children, children of the children and so on)
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Get the "then" argument type by unwrapping the promise.
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
