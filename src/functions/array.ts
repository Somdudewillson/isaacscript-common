import { getRandomInt } from "./random";

/**
 * Helper function for determining if two arrays contain the exact same elements.
 */
export function arrayEquals<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export function arrayEmpty<T>(array: T[]): void {
  array.splice(0, array.length);
}

export function getRandomArrayElement<T>(array: T[], seed: int): T {
  const randomIndex = getRandomInt(0, array.length - 1, seed);
  return array[randomIndex];
}

/**
 * Copies and removes the specified element from the array. Returns the copied array.
 */
export function arrayRemove<T>(array: T[], element: T): T[] {
  const arrayCopy = [...array];
  const index = array.indexOf(element);
  arrayCopy.splice(index, 1);

  return arrayCopy;
}

/**
 * Initializes an array with all elements containing the specified default value.
 *
 * Example:
 * ```
 * const playerTransformations = initArray(false, PlayerForm.NUM_PLAYER_FORMS - 1);
 * ```
 */
export function initArray<T>(defaultValue: T, size: int): T[] {
  const array: T[] = [];
  for (let i = 0; i < size; i++) {
    array.push(defaultValue);
  }

  return array;
}

/**
 * Since Lua uses tables for every non-primitive data structure,
 * it is non-trivial to determine if a particular table is being used as an array.
 * isArray returns true if the table contains all numerical indexes that are contiguous,
 * starting at 1.
 */
export function isArray(table: LuaTable): boolean {
  // First, handle the case of non-numerical keys
  // (and count the entries in the table)
  let numEntries = 0;
  for (const [key] of pairs(table)) {
    numEntries += 1;

    const keyType = type(key);
    if (keyType !== "number") {
      return false;
    }
  }

  // Second, check for non-contiguous elements
  for (let i = 1; i <= numEntries; i++) {
    const element = table.get(i) as unknown | undefined;
    if (element === undefined) {
      return false;
    }
  }

  return true;
}
