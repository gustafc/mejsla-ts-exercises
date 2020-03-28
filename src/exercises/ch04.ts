export function reserve(leaveOn: Date, returnOn: Date, destination: string): string;
export function reserve(leaveOn: Date, destination: string): string;
export function reserve(destination: string): string;
export function reserve(
  leaveOnOrDestination: string | Date,
  returnOnOrDestination?: string | Date,
  maybeDestination?: string,
): string {
  if (typeof leaveOnOrDestination === "string") {
    return `Going ASAP to ${leaveOnOrDestination.toUpperCase()}`;
  } else if (returnOnOrDestination instanceof Date) {
    // Return trip
    return `Going on ${leaveOnOrDestination.toLocaleDateString()} to ${maybeDestination?.toUpperCase()} and returning on ${returnOnOrDestination.toLocaleDateString()}`;
  } else {
    // One-way on a specific date
    return `One-way ticket to ${returnOnOrDestination?.toUpperCase()} leaving on ${leaveOnOrDestination.toLocaleDateString()}`;
  }
}

export function call<A1, T extends unknown[], R>(
  fn: (a1: A1, a2: string, ...args: T) => R,
  a1: A1,
  a2: string,
  ...args: T
): R {
  return fn(a1, a2, ...args);
}
