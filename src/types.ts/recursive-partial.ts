export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export function merge<T extends Mergeable>(
  original: T,
  patch?: RecursivePartial<T>
): T {
  if (!patch) {
    return original;
  }
  const merged = { ...original };
  for (const [key, value] of Object.entries(patch)) {
    let patchedValue;
    if (key in original) {
      const originalValue = original[key];
      if (originalValue && typeof originalValue === "object") {
        patchedValue = merge(originalValue, value);
      } else {
        patchedValue = value;
      }
    } else {
      patchedValue = value;
    }
    merged[key as keyof T] = patchedValue;
  }
  return merged;
}

type Mergeable = {
  [key: string]: string | number | boolean | null | undefined | Mergeable;
};
