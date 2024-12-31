export function objectToQueryString(
  obj: Record<string, string | number | boolean>,
): string {
  const params = new URLSearchParams();

  for (const key in obj) {
    params.append(key, String(obj[key]));
  }

  return params.toString();
}
