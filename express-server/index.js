import​​ app  ​from​​​ "./app"​;
import { connectDbToApp } from "./helpers";
import defaultConfig from "./config/defaultConfig.json";
const​​ appPort = process.env.PORT || defaultConfig.defaultPort​;

connectDbToApp(app, appPort);



