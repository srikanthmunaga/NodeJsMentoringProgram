import bodyParser from "body-parser";
import express from "express";
import { parsedCookies, parsedQuery } from "./middlewares";
import session from "express-session";
import passport from "passport";
import config from "./config/authConfig.json";

import { router } from "./routes";

const app = express();
app.use(parsedCookies);
app.use(parsedQuery);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.listen(3000);

export { app };
