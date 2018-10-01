import { defaultLanguage } from './constants';

/**
 * Super basic lang file, pretty much a const
 */
const l10n = {
  english: {
    madeWithLove: '毎日毎日歌える',
    lyrics: 'lyrics',
  },
};

/**
 * Standardize fetcher, by default if language not found, give english back.
 */
const getLocale = (language, tag) => {
  if (l10n[language] && l10n[language][tag]) return l10n[language][tag];
  if (l10n[defaultLanguage] && l10n[defaultLanguage][tag]) return l10n[defaultLanguage][tag];
  return null;
};

export default getLocale;
