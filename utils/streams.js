const minimist = require("minimist");
const { infoMessages } = require("./../config/constants");
const { checkInputValidity } = require("./validateInput");
const { actions } = require("./actions");
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
