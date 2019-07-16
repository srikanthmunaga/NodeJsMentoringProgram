const fs = require("fs");
import { infoMessages, errorMessages } from './../config/constants';

const checkInputValidity = args => {
  if (!args.length) {
    process.stdout.write(infoMessages.wrongInput);
    process.stdout.write(infoMessages.help);
    return false;
  }
  if (args[0] === "--help" || args[0] === "-h") {
    process.stdout.write(infoMessages.help);
    return false;
  }
  return true;
};
const checkFilePathValidity = path => {
  if (!path) {
    throw new Error(errorMessages.missingFilePath);
  }
  if (!fs.existsSync(path)) {
    throw new Error(errorMessages.wrongFilePath);
  }
};

export { checkFilePathValidity, checkInputValidity }