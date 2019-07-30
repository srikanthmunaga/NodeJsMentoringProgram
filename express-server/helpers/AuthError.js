// export class AuthError extends Error {
//   failedAuth(name, message) {
//     return new AuthError(`${name} authorization is failed`, {
//       [name]: message
//     });
//   }

//   constructor(message = "AuthorizationError", details = undefined) {
//     super(message);
//   }
// }

// export class AuthError extends Error {
//   public static failedAuth (name: string, message: string) {
//     return new AuthError(`${name} authorization is failed`, {
//       [name]: message,
//     });
//   }

//   constructor (message: string = "AuthorizationError",
//                 details: object = undefined) {
//     super(message);
//   }
// }

exports.failedAuth = function(name, message) {
  console.log("here");
  return name + "Authentication failed";
};
