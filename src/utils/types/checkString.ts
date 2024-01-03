import { z } from "zod";

export function checkStringNotEmpty(
  str?: string,
  err: string = `Missing env variable`
) {
  return z.string().min(1, { message: err }).parse(str);
}
