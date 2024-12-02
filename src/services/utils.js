export function generateRandom4DigitString() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
