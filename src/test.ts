import { S } from "./schema.js"
import { NonEmptyString, NonEmptyString255 } from "./strings.js"

const a = S.string("abc")
const b = S.string("abc")
const c = S.string("abc")

const a2 = NonEmptyString("gagae")
const b2 = NonEmptyString255("gagae")
