const { alphabetUpperCase, alphabetLowerCase } = require('./alphabet');

const getEncodedPos = (letterPos, shift, lettersAmount) =>
  (letterPos + shift) % lettersAmount;

const getDecodedPos = (letterPos, shift, lettersAmount) => {
  const substraction = letterPos - shift;

  if (substraction < 0) return lettersAmount + substraction;

  return (letterPos - shift) % lettersAmount;
};

const ALPHABET_LENGTH = alphabetLowerCase.length;

const applyCeaserCipher = (inputString, shift, encriptionFunc) =>
  inputString.split('').reduce((acc, current) => {
    const upperCaseLetterIndex = alphabetUpperCase.indexOf(current);

    if (upperCaseLetterIndex !== -1)
      return (
        acc +
        alphabetUpperCase[
          encriptionFunc(upperCaseLetterIndex, shift, ALPHABET_LENGTH)
        ]
      );

    const lowerCaseLetterIndex = alphabetLowerCase.indexOf(current);

    if (lowerCaseLetterIndex !== -1)
      return (
        acc +
        alphabetLowerCase[
          encriptionFunc(lowerCaseLetterIndex, shift, ALPHABET_LENGTH)
        ]
      );

    return acc + current;
  }, '');

module.exports = { applyCeaserCipher, getEncodedPos, getDecodedPos };
