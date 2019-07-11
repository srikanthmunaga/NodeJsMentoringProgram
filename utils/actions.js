const csvtojson = require("csvtojson");
const fs = require("fs");
const path = require("path");
const request = require("request");
const through2 = require("through2");
const { fileExtensions, bundlerConstants } = require("./../config/constants");
const { checkFilePathValidity } = require("./validateInput");

const actions = {
  reverse: () => {
    console.log("Please enter any string to reverse.\n");
    process.stdin
      .pipe(
        through2(function write(buffer, encoding, next) {
          this.push(
            buffer
              .toString()
              .split("")
              .reverse()
              .join("")
          );
          this.push("\n");
          next();
        })
      )
      .pipe(process.stdout);
  },
  transform: () => {
    console.log("Please enter any string to transform to upper case.\n");
    process.stdin
      .pipe(
        through2(function write(buffer, encoding, next) {
          this.push(buffer.toString().toUpperCase());
          next();
        })
      )
      .pipe(process.stdout);
  },
  outputFile: payload => {
    var file = payload.file;
    checkFilePathValidity(file);
    fs.createReadStream(file).pipe(process.stdout);
  },
  convertFromFile: payload => {
    var file = payload.file;
    checkFilePathValidity(file);
    fs.createReadStream(file)
      .pipe(csvtojson())
      .pipe(process.stdout);
  },
  convertToFile: payload => {
    var file = payload.file;
    checkFilePathValidity(file);
    var fileInfo = path.parse(file);
    var filePath = fileInfo.dir + "/" + fileInfo.name + fileExtensions.json;
    fs.createReadStream(file)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        console.log(
          "\nThe file has been converted successfully to json format."
        );
      });
  },
  cssBundler: payload => {
    var dirPath = payload.path;
    checkFilePathValidity(dirPath);
    var writeStreamPath = dirPath + "/" + bundlerConstants.bundleFileName;
    var cssFiles = fs.readdirSync(dirPath).filter(file => {
      return path.extname(file) === fileExtensions.css;
    });
    var readStreams = [];
    var writeStream = fs.createWriteStream(writeStreamPath, { flags: "w+" });
    cssFiles.forEach(file => {
      readStreams.push(fs.createReadStream(dirPath + "/" + file));
    });
    readStreams.forEach(readStream => {
      readStream.pipe(writeStream);
    });
    writeStream.on("finish", () => {
      var newWriteStream = fs.createWriteStream(writeStreamPath, {
        flags: "a+"
      });
      request(bundlerConstants.url)
        .pipe(newWriteStream)
        .on("close", () => {
          console.log(
            `\nThe css files has been concated and merged into ${
              bundlerConstants.bundleFileName
            } file.`
          );
        });
    });
  }
};

module.exports = {
  actions
};
