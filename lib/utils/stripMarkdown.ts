export default function stripMarkdown(markdown?: string) {
  if (!markdown) return markdown;
  // Remove headers
  markdown = markdown.replace(/(^|\n)#+\s?/g, "");

  // Remove bold and italic (e.g., **text**, __text__, *text*, _text_)
  markdown = markdown.replace(/(\*\*|__)(.*?)\1/g, "$2");
  markdown = markdown.replace(/([*_])(.*?)\1/g, "$2");

  // Remove strikethrough (e.g., ~~text~~)
  markdown = markdown.replace(/~~(.*?)~~/g, "$1");

  // Remove inline code (e.g., `code`)
  markdown = markdown.replace(/`([^`]+)`/g, "$1");

  // Remove blockquotes (e.g., > text)
  markdown = markdown.replace(/(^|\n)>+/g, "");

  // Remove images and links (e.g., ![alt](url) and [text](url))
  markdown = markdown.replace(/!\[.*?]\(.*?\)/g, "");
  markdown = markdown.replace(/\[(.*?)]\(.*?\)/g, "$1");

  // Remove unordered lists (e.g., - text, * text)
  markdown = markdown.replace(/(^|\n)[*-]\s+/g, "");

  // Remove ordered lists (e.g., 1. text)
  markdown = markdown.replace(/(^|\n)\d+\.\s+/g, "");

  // Remove horizontal rules (e.g., --- or ***)
  markdown = markdown.replace(/(^|\n)(---|\*\*\*)/g, "");

  // Remove extra newlines
  markdown = markdown.replace(/\n{2,}/g, "\n");

  // Trim leading and trailing spaces
  return markdown.trim();
}
