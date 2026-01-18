/**
 * Utility function to unescape HTML entities
 * Converts &lt; to <, &gt; to >, &quot; to ", &amp; to &, etc.
 */
export function unescapeHtml(html: string): string {
  if (!html) return '';
  
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}

/**
 * Clean and prepare HTML content for rendering
 */
export function cleanHtmlContent(content: string): string {
  if (!content) return '';
  
  // First unescape HTML entities
  let cleaned = unescapeHtml(content);
  
  // Remove extra whitespace but preserve formatting tags
  cleaned = cleaned.trim();
  
  return cleaned;
}
