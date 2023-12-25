import type { Arbitrary } from "@effect/schema/Arbitrary"
import { pipe } from "effect"
import type { Simplify } from "effect/Types"
import { fromBrand, nominal } from "./ext.js"
import { type B, S } from "./schema.js"
import { NonEmptyString } from "./strings.js"
import type { NonEmptyString255Brand, NonEmptyString2k, NonEmptyStringBrand } from "./strings.js"
import type { Refinement } from "effect/Predicate"

/**
 * A string that is at least 1 character long and a maximum of 50.
 */
export interface NonEmptyString50Brand extends Simplify<B.Brand<"NonEmptyString50"> & NonEmptyString255Brand> { }

/**
 * A string that is at least 1 character long and a maximum of 50.
 */
export type NonEmptyString50 = string & NonEmptyString50Brand

/**
 * A string that is at least 1 character long and a maximum of 50.
 */
export const NonEmptyString50 = pipe(
  NonEmptyString,
  S.maxLength(50, { title: "NonEmptyString50" }),
  fromBrand(nominal<NonEmptyString2k>())
)

/**
 * A string that is at least 3 character long and a maximum of 255.
 */
export interface Min3String255Brand extends Simplify<B.Brand<"Min3String255"> & NonEmptyString255Brand> { }

/**
 * A string that is at least 3 character long and a maximum of 255.
 */
export type Min3String255 = string & Min3String255Brand

/**
 * A string that is at least 3 character long and a maximum of 255.
 */
export const Min3String255 = pipe(
  S.string,
  S.minLength(3),
  S.maxLength(255, { title: "Min3String255" }),
  fromBrand(nominal<NonEmptyString2k>())
)


export interface UrlBrand extends Simplify<B.Brand<"Url"> & NonEmptyStringBrand> { }

export type Url = NonEmptyString & UrlBrand

const isUrl: Refinement<string, Url> = (s: string): s is Url => {
  return !!s //validator.default.isURL(s, { require_tld: false })
}

export const Url = NonEmptyString.pipe(
  S.filter(isUrl, { arbitrary: (): Arbitrary<string> => (fc) => fc.webUrl(), title: "Url" }),
  fromBrand(nominal<UrlBrand>())
)

export const PositiveInt = S.Int.pipe(S.positive())
export type PositiveInt = S.Schema.To<typeof PositiveInt>
