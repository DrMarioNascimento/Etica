// This is a UI review gate. The public repository is not a confidential store.
export const REVIEW_EMAIL = 'mariocnascimento@gmail.com';
export const BRIDGE_ORIGIN = 'https://fisiologia-em-fuga.drmarionascimento.com.br';
export function canReview(user, token) {
  return !!user && user.emailVerified === true && user.email?.toLowerCase() === REVIEW_EMAIL
    && token?.claims?.email_verified === true && token?.claims?.email?.toLowerCase() === REVIEW_EMAIL
    && token?.claims?.firebase?.sign_in_provider === 'google.com';
}
export function validBridgeMessage(event, popup, nonce) {
  return !!popup && event.source === popup && event.origin === BRIDGE_ORIGIN
    && event.data?.type === 'etica-review-google' && event.data?.nonce === nonce
    && typeof event.data?.idToken === 'string' && event.data.idToken.length > 100;
}
