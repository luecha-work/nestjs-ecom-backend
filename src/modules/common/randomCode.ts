export function generateRandomCode(prefix: string = 'HELLO'): string {
  const randomNumbers = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(9, '0');
  const randomCode = `${prefix}-${randomNumbers}`;
  return randomCode;
}
