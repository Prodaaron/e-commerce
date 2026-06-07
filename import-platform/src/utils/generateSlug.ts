export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-")         // Spaces -> hyphens
    .replace(/-+/g, "-");         // Remove duplicate hyphens
}