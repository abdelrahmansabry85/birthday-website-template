// Resolves a public-asset path against the deploy base URL.
// - Local dev:      "/images/x.jpg"  (BASE_URL = "/")
// - GitHub Pages:   "/birthday-website-template/images/x.jpg" (BASE_URL = "/birthday-website-template/")
// - Absolute URLs ("https://...") and data URIs pass through untouched.
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
