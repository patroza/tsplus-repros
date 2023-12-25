import { ParseOptions } from "@effect/schema/AST";
import { B, S } from "./schema.js";
import { Either, Option } from "effect";

/**
 * @tsplus fluent effect/schema/Schema __call
 */
export const parseSync = <I, A>(self: S.Schema<I, A>, u: I, options?: ParseOptions | undefined) =>
  S.parseSync(self)(u, options)


export interface Constructor<in out A extends B.Brand<any>> {
  readonly [B.RefinedConstructorsTypeId]: B.RefinedConstructorsTypeId
  /**
   * Constructs a branded type from a value of type `A`, throwing an error if
   * the provided `A` is not valid.
   */
  (args: Unbranded<A>): A
  /**
   * Constructs a branded type from a value of type `A`, returning `Some<A>`
   * if the provided `A` is valid, `None` otherwise.
   */
  option(args: Unbranded<A>): Option.Option<A>
  /**
   * Constructs a branded type from a value of type `A`, returning `Right<A>`
   * if the provided `A` is valid, `Left<BrandError>` otherwise.
   */
  either(args: Unbranded<A>): Either.Either<B.Brand.BrandErrors, A>
  /**
   * Attempts to refine the provided value of type `A`, returning `true` if
   * the provided `A` is valid, `false` otherwise.
   */
  is(a: Unbranded<A>): a is Unbranded<A> & A
}

export const fromBrand = <C extends B.Brand<string | symbol>>(
  constructor: Constructor<C>,
  options?: S.FilterAnnotations<Unbranded<C>>
) =>
  <I, A extends Unbranded<C>>(self: S.Schema<I, A>): S.Schema<I, A & C> => {
    return S.fromBrand(constructor as any, options as any)(self as any) as any
  }

export type Brands<P> = P extends B.Brand<any> ? { readonly [B.BrandTypeId]: P[B.BrandTypeId] }
  : never

export type Unbranded<P> = P extends infer Q & Brands<P> ? Q : P

export const nominal: <A extends B.Brand<any>>() => Constructor<A> = <
  A extends B.Brand<any>
>(): Constructor<
  A
> => B.nominal<A>() as any
