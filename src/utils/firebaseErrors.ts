/**
 * Translates raw Firebase technical error codes into user-friendly localized messages.
 * Ideal for polishing user experience and displaying clean banners in UI.
 */
export const getFriendlyErrorMessage = (error: any): string => {
  const code = error?.code || '';
  const message = error?.message || '';

  // Handle configuration-not-found check which might appear as code or message
  if (code.includes('configuration-not-found') || message.includes('auth/configuration-not-found')) {
    return 'Email/Password authentication is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.';
  }

  switch (code) {
    // Authentication Errors
    case 'auth/invalid-email':
      return 'The email address is not formatted correctly.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account exists with this email. Please register an account first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please verify and try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use at least 6 characters.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled in the Firebase Console.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Double check your password or Sign Up for a new account.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. Try again later.';

    // Firestore Database Errors
    case 'permission-denied':
      return 'You do not have permission to access these notes.';
    case 'unavailable':
      return 'The database service is temporarily offline. Please check your connection.';

    default:
      return message || 'An unexpected error occurred. Please try again.';
  }
};
