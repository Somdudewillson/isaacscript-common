import { initRNG } from "./util";

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because `RNG.RandomFloat()` can return a value of 0.999, but it will never
 * return a value of exactly 1.)
 */
export function getRandom(seed: int): float {
  const rng = initRNG(seed);

  return rng.RandomFloat();
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because `RNG.RandomFloat()` can return a value of 0.999, but it will never
 * return a value of exactly 1.)
 *
 * Example:
 * ```
 * const realNumberBetweenOneAndThree = getRandomFloat(1, 3, seed);
 * ```
 */
export function getRandomFloat(min: int, max: int, seed: int): float {
  // From: https://stackoverflow.com/questions/40431966
  return min + getRandom(seed) * (max - min);
}

/**
 * This returns a random integer between min and max, inclusive.
 *
 * Example:
 * ```
 * const oneTwoOrThree = getRandomInt(1, 3, seed);
 * ```
 */
export function getRandomInt(min: int, max: int, seed: int): int {
  const rng = initRNG(seed);

  return rng.RandomInt(max - min + 1) + min;
}
