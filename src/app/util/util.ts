export function isNullOrEmpty(value: string | undefined): boolean {
    return value === undefined || value === null || value == "" || value.trim() == "";
}

export function isNull<T>(value: T) {
  return value === undefined || value === null;
}