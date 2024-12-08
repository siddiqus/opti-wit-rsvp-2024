export function generateRandom4DigitString() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

function findCommonWordsAndPhrases(sentences, fillerWords = []) {
  const frequencyMap = {};

  // Convert filler words to a Set for efficient lookup
  const fillerSet = new Set(fillerWords.map((word) => word.toLowerCase()));

  sentences.forEach((sentence) => {
    // Normalize text: convert to lowercase and split into words using regex
    const words = sentence.toLowerCase().match(/\b[\w']+\b/g); // Matches words, including contractions like "don't"
    if (!words) return;

    // Filter out filler words
    const filteredWords = words.filter((word) => !fillerSet.has(word));

    // Generate all possible words and phrases
    for (let length = 1; length <= filteredWords.length; length++) {
      for (let i = 0; i <= filteredWords.length - length; i++) {
        const phrase = filteredWords.slice(i, i + length).join(" ");
        frequencyMap[phrase] = (frequencyMap[phrase] || 0) + 1;
      }
    }
  });

  // Convert frequency map to sorted array of entries
  const sortedResults = Object.entries(frequencyMap)
    .filter(([, count]) => count > 1) // Keep only those with frequency > 1
    .sort((a, b) => b[1] - a[1]); // Sort by frequency in descending order

  return sortedResults;
}

// Extend filler words with common pronouns and punctuation
const additionalFillerWords = [
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "their",
  "that",
  "this",
  "there",
  "those",
  "sometimes",
  "being",
  "into",
  "to",
  "for",
  "so",
  "what",
  "face",
  "as",
  "an",
  "from",
  "also",
  "or",
  "can",
  "job",
  "having",
  "was",
  "is",
  "will",
  "not"
];

const fillerWords = ["is", "and", "the", "a", "to", "of", "in"]; // Common filler words
const allFillerWords = Array.from(
  new Set([
    ...fillerWords.map((word) => word.toLowerCase()),
    ...additionalFillerWords,
  ])
);

export function getWordCloudData(sentences) {
  const commonWordsAndPhrases = findCommonWordsAndPhrases(
    sentences,
    allFillerWords
  );

  const results = commonWordsAndPhrases.map((element) => {
    return {
      text: element[0],
      value: element[1],
    };
  });
  return results;
}
