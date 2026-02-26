const CITATION_DELIMITER_START = '\n<!--CITATIONS:';
const CITATION_DELIMITER_END = '-->';

/**
 * Extract citations array and clean text from a completion string
 * that may contain a citation delimiter appended by the API route.
 */
export function extractCitations(text: string): { cleanText: string; citations: string[] } {
  const delimiterIndex = text.lastIndexOf(CITATION_DELIMITER_START);
  if (delimiterIndex === -1) {
    return { cleanText: text, citations: [] };
  }

  const cleanText = text.slice(0, delimiterIndex);
  const jsonStart = delimiterIndex + CITATION_DELIMITER_START.length;
  const jsonEnd = text.lastIndexOf(CITATION_DELIMITER_END);

  if (jsonEnd <= jsonStart) {
    return { cleanText, citations: [] };
  }

  try {
    const citations = JSON.parse(text.slice(jsonStart, jsonEnd));
    if (Array.isArray(citations) && citations.every((c: unknown) => typeof c === 'string')) {
      return { cleanText, citations };
    }
  } catch {
    // Malformed JSON — return no citations
  }
  return { cleanText, citations: [] };
}

/**
 * Strip the citation delimiter from streaming text to prevent it
 * from flashing in the UI. Handles both full and partial delimiters
 * (the text may end mid-delimiter during streaming).
 */
export function stripCitationDelimiter(text: string): string {
  const fullIndex = text.lastIndexOf(CITATION_DELIMITER_START);
  if (fullIndex !== -1) {
    return text.slice(0, fullIndex);
  }

  // Check for partial match at the end: the streaming text might
  // end with a prefix of the delimiter (e.g. "\n<!--CITA").
  const delimiter = CITATION_DELIMITER_START;
  for (let i = delimiter.length; i >= 1; i--) {
    if (text.endsWith(delimiter.slice(0, i))) {
      return text.slice(0, text.length - i);
    }
  }

  return text;
}

/**
 * Convert [n] citation markers in markdown text to custom citation links.
 * Replaces [1], [2], etc. with [[n]](citation:n) markdown links.
 * Only converts markers where n is within the valid citation range.
 * Skips [n] that are already part of markdown link syntax [text](url).
 */
export function preprocessCitationMarkers(text: string, citationCount: number): string {
  if (citationCount === 0) return text;

  return text.replace(/\[(\d+)\](?!\()/g, (match, numStr: string) => {
    const num = parseInt(numStr, 10);
    if (num >= 1 && num <= citationCount) {
      return `[${match}](citation:${num})`;
    }
    return match;
  });
}

/**
 * Extract domain name from URL for display purposes.
 */
export function getDomainFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
