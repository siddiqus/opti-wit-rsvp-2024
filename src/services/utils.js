export function generateRandom4DigitString() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
