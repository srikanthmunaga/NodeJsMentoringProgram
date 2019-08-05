const FILE_ADDED = "FILE_ADDED";
const FILE_MODIFIED = "FILE_MODIFIED";
const FILE_DELETED = "FILE_DELETED";
const NOTFOUND = "404";
const ErrorMessages = {
  NOPRODUCT: "There is no product with such id",
  NOPRODUCTS: "There is no products to show",
  NOREVIEWS: "There is no reviews for selected products",
  NOUSERS: "There is no users to show",
  NOTFOUND: "Not found",
  NOUSER: "User with such email isn't register",
  INCORRECTPASSWORD: "Password isn't correct",
  NOTOKEN: "There is no token",
  NOTVERIFIEDTOKEN: "The token is not verified",
  FAILEDAUTH: "Authorization is failed",
  FAILDEDGOOGLEAUTH: "Google+ user is not authorized",
  FAILEDLOCALAUTH: "User is not authorized",
  WRONGCREDENTIALS: "Wrong credentials"
};
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

const UriConstants = "../data/index.html";

export {
  FILE_ADDED,
  FILE_DELETED,
  FILE_MODIFIED,
  infoMessages,
  fileExtensions,
  errorMessages,
  bundlerConstants,
  UriConstants,
  NOTFOUND,
  ErrorMessages
};
