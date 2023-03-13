import { capitalize } from "src/helpers/capitalize"

test("should return empty string if passed as empty to capitalize function", () => {
  expect(capitalize("")).toBe("")
})
