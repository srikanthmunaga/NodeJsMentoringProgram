export class AuthError extends Error {
  failedAuth(name, message) {
    return new AuthError(`${name} authorization is failed`, {
      [name]: message
    });
  }

  constructor(message = "AuthorizationError", details = undefined) {
    super(message);
  }
}
