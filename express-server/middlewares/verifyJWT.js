import jwt from "jsonwebtoken";
import { isMatch } from "lodash";
import userConfig from "../config/authConfig.json";

import { NOTFOUND, ErrorMessages } from "../../config/constants";
import { errorResponse } from "../helpers/responses";

export const verifyJWT = (req, res, next) => {
  const token = req.get("x-access-token");
  if (!token) {
    res.json(
      errorResponse({
        code: NOTFOUND,
        message: ErrorMessages.NOTFOUND,
        extendedMessage: ErrorMessages.NOTOKEN
      })
    );
  }

  jwt.verify(token, userConfig.jwtSecret, function(error, decoded) {
    if (error) {
      res.json(
        errorResponse({
          code: NOTFOUND,
          message: ErrorMessages.NOTFOUND,
          extendedMessage: ErrorMessages.NOTVERIFIEDTOKEN
        })
      );
    }

    if (!isMatch(decoded, userConfig.userCreds)) {
      res.json(
        errorResponse({
          code: NOTFOUND,
          message: ErrorMessages.NOTFOUND,
          extendedMessage: ErrorMessages.NOTVERIFIEDTOKEN
        })
      );
    }

    next();
  });
};
