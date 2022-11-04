/**
 * @tsplus getter String stringToBool
 */
export function stringToBool(str: string) {
  return !!str
}

declare global {
  /**
   * @tsplus type String
   */
  interface String { }
}
