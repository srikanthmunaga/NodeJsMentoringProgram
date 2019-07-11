const FILE_ADDED = "FILE_ADDED";
const FILE_MODIFIED = "FILE_MODIFIED";
const FILE_DELETED = "FILE_DELETED";
const infoMessages = {
  wrongInput: "You have given a wrong input.",
  wrongOption:
    "The given action option doesn't exist. Please use any of the below options.",
  help:
    "\n\n\n--action, -a    action to be launch\n--file, -f      file path\n--help, -h      list of available commands\n\naction           |  file  |\n-----------------------------------------------------------------------------------------\nreverse          |        | reverse the string data\ntransform        |        | transform the string data to uppercase\noutputFile       | <path> | read the data from <path>\nconvertFromFile  | <path> | read the csv data from <path> and convert it to json\nconvertToFile    | <path> | read the csv data from <path>, convert if to json and write to file with the same name but with .json extension\n    "
};
const fileExtensions = {
  json: ".json",
  css: ".css",
  csv: ".csv"
};
const errorMessages = {
  missingFilePath:
    "The action need --file/-f  or --path/-p option, please provide it to run your command.",
  wrongFilePath:
    "There is no such file on the specified path. Please, check the file name or the file path."
};
const bundlerConstants = {
  bundleFileName: "bundle.css",
  url: "https://epa.ms/nodejs18-hw3-css"
};
module.exports = {
  infoMessages,
  fileExtensions,
  errorMessages,
  bundlerConstants,
  FILE_ADDED,
  FILE_MODIFIED,
  FILE_DELETED
};
