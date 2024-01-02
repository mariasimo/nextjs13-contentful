export function isString(str?: string): str is string {
  return typeof str === "string";
}
