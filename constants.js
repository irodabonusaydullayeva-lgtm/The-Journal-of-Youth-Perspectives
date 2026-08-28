/**
 * Categories available for articles.
 * Data-driven — add new categories here and they propagate everywhere.
 */
export const CATEGORIES = [
  {
    name: 'Human Rights',
    slug: 'human-rights',
    description: 'Exploring justice, dignity, and the universal rights that belong to every person regardless of borders.',
    icon: 'scales',
  },
  {
    name: 'Ecology',
    slug: 'ecology',
    description: 'Examining our relationship with the planet — climate, biodiversity, and sustainable futures.',
    icon: 'leaf',
  },
  {
    name: 'Gender Equality',
    slug: 'gender-equality',
    description: 'Advancing equity and opportunity for all genders through education, policy, and cultural change.',
    icon: 'equality',
  },
];

/**
 * localStorage keys for author persistence.
 */
export const STORAGE_KEYS = {
  AUTHOR_NAME: 'journal_author_name',
  AUTHOR_EMAIL: 'journal_author_email',
};

/**
 * Format a date string into a readable format.
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date like "August 28, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncate text to a maximum length with ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 150) {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength).trimEnd() + '…';
}

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate URL format (basic).
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url) return true; // URL is optional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
