import { randomNumberBetween } from "./numberUtils";

export function arrFirst(arr, n = 1) {
  // Directly return the first element if n is 1
  if (n === 1) return arr[0];
  // Use slice to get the first n elements efficiently
  return arr.slice(0, n);
}

export function arrLast(arr, n = 1) {
  // Directly return the last element if n is 1
  if (n === 1) return arr[arr.length - 1];
  // Use slice with a negative start index to get the last n elements efficiently
  return arr.slice(-n);
}

export function arrRandom(arr) {
  return arr[randomNumberBetween(0, arr.length - 1)];
}

export function arrGetUniqueObjectValues(arr, value) {
  return [
    ...new Set(
      arr.map((item) => {
        return item[value];
      })
    ),
  ];
}

export function arrGroupBy(arr, key) {
  return arr.reduce((group, element) => {
    const keyValue = element[key];

    return {
      ...group,
      [keyValue]: [...(group[keyValue] ?? []), element],
    };
  }, {});
}

export function arrIsNotEmpty(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function arrShuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

export function arrFindMinMaxByKey(arr, key) {
  if (arr.length === 0) {
    return { min: undefined, max: undefined };
  }

  let min = arr[0][key];
  let max = arr[0][key];

  arr.forEach((element) => {
    const value = element[key];
    if (value < min) min = value;
    if (value > max) max = value;
  });

  return { min, max };
}
