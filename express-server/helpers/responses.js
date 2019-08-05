export const successResponse = ({ email, username, token }) => {
  return {
    code: "200",
    message: "OK",
    data: {
      user: {
        email: email,
        username: username
      }
    },
    token: token
  };
};

export const errorResponse = ({ code, message, extendedMessage }) => {
  console.log(code, message, extendedMessage);
  return {
    code: code,
    message: message,
    data: {
      extendedMessage: extendedMessage
    }
  };
};
