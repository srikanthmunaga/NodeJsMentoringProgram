const minimist = require("minimist");
import { infoMessages } from './../config/constants';
import { checkInputValidity } from './validateInput';
import { actions } from './actions.js';
const args = process.argv.slice(2);
if (checkInputValidity(args)) {
  var argv = minimist(args);
  var action = argv.action || argv.a;
  var file = argv.file || argv.f;
  var path = argv.path || argv.p;
  if (!actions[action]) {
    process.stdout.write(infoMessages.wrongOption);
    process.stdout.write(infoMessages.help);
  } else {
    actions[action]({ file: file, path: path });
  }
}
