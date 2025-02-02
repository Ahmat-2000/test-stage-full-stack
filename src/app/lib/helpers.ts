
/**
 * This function checks if the email follows a valid format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
  This function checks if the password is strong:
    At least 8 characters long.

    Contains at least one uppercase letter.

    Contains at least one lowercase letter.

    Contains at least one number.

    Contains at least one special character (!@#$%^&*)
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`]{8,}$/;
  return passwordRegex.test(password);
}
    
