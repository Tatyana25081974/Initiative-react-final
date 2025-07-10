export const firstLetterToUpperCase = (text) => {
  return text.replace(
    /^(\s*\d*\.?\s*)(\w)/,
    (_, prefix, firstLetter) => prefix + firstLetter.toUpperCase()
  );
};
