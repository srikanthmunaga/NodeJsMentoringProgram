import { User, Products } from "./models";
import * as config from "./config/config.json";
import { Importer, DirWatcher } from "./models";

console.log(config.appName);
var user = new User();
var products = new Products();
const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);

dirWatcher.watchPath(`${process.cwd()}/data`, 2000);
importer.listenForFilesChanged();
