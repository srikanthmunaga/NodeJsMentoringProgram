import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/authConfig.json";

import { NOTFOUND, ErrorMessages } from "../../config/constants";
import { AuthError, errorResponse, successResponse } from "../helpers";

export const auth = (req, res) => {
  const { email, password } = req.body;
  const user = config.users.find(user => user.email === email);

  if (!user) {
    res.json(
      errorResponse({
        code: NOTFOUND,
        message: ErrorMessages.NOTFOUND,
        extendedMessage: ErrorMessages.NOUSER
      })
    );
  }

  if (user.password !== password) {
    res.json(
      errorResponse({
        code: NOTFOUND,
        message: ErrorMessages.NOTFOUND,
        extendedMessage: ErrorMessages.INCORRECTPASSWORD
      })
    );
  }

  const token = jwt.sign({ email, password }, config.jwtSecret);

  res.json(
    successResponse({
      username: user.username,
      email: user.email,
      token
    })
  );
};

export const passportAuth = social => (req, res) => {
  passport.authenticate(social, (err, user) => {
    if (err) {
      throw AuthError.failedAuth(social, err);
    }

    res.json(
      successResponse({
        email: user.email,
        username: user.displayName
      })
    );
  })(req, res);
};
