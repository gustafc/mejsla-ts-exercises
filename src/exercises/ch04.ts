export function reserve(leaveOn: Date, returnOn: Date, destination: string): string;
export function reserve(leaveOn: Date, destination: string): string;
export function reserve(
  leaveOn: Date,
  returnOnOrDestination: string | Date,
  maybeDestination?: string,
): string {
  if (returnOnOrDestination instanceof Date) {
    // Return trip
    return `Going on ${leaveOn.toLocaleDateString()} to ${maybeDestination?.toUpperCase()} and returning on ${returnOnOrDestination.toLocaleDateString()}`;
  } else {
    // One-way on a specific date
    return `One-way ticket to ${returnOnOrDestination.toUpperCase()} leaving on ${leaveOn.toLocaleDateString()}`;
  }
}
