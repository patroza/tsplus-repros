export interface SomeModel extends Model {
  test2: 1
}

export function someOtherFunction(): SomeModel {
  return { test: "abc", test2: 1, }
}