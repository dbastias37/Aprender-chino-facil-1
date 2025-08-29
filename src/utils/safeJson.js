export const stripTrailingCommas = (s = '') => s.replace(/,\s*([}\]])/g, '$1');

export const safeParseJson = (s, fallback = null) => {
  try {
    return JSON.parse(stripTrailingCommas(s));
  } catch (e) {
    console.warn('[safeParseJson]', e);
    return fallback;
  }
};

