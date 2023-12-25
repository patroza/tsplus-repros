
import { StringId } from "./moreStrings.js"
import { S } from "./schema.js"
import { NonEmptyString, NonEmptyString255 } from "./strings.js"

const a = S.string("abc")
const b = S.string("abc")
const c = S.string("abc")

const a2 = NonEmptyString("gagae")
const b2 = NonEmptyString255("gagae")
const a3 = S.string.parse("abc")

const C3 = S.string.Arbitrary.sample

const C4 = StringId.make()
class C5 extends S.Class<C5>()({ a: StringId, b: StringId.withDefault() }) { }

console.log({
  a, b, c, a2, b2, a3
})
console.log({ C3, C4, C5: new C5({ a: "abcdef" }) })