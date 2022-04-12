import * as bcrypt from 'bcryptjs';

/**
 * Hash password or any string
 * @param password
 */
export function hashPassword(password: string): string {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

/**
 * Compare hased string
 * @param password
 */
export function comparePassword(password: string, encrypted: string) {
  return bcrypt.compareSync(password, encrypted);
}
