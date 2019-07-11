const fs = require("fs");
const { infoMessages, errorMessages } = require("./../config/constants");

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
module.exports = {
  checkFilePathValidity,
  checkInputValidity
};
