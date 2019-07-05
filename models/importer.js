import fs from "fs";
import Papa from "papaparse";

class Importer {
  constructor(eventEmitter, async = true) {
    this.eventEmitter = eventEmitter;
    this.async = async;
  }
  import = path => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        resolve(data);
      });
    });
  };
  importSync = path => {
    return fs.readFileSync(path, "utf8");
  };
  logCsvFileData = data => {
    console.log(`File Name : ${data.file}, File status : ${data.action}`);
    console.log(Papa.parse(data.csv, { header: true }));
  };
  listenForFilesChanged = () => {
    this.eventEmitter.on("fileChange", data => {
      Object.keys(data).map(file => {
        this.import(file)
          .then(csv => {
            this.logCsvFileData({ file, action: data[file], csv });
          })
          .catch(error => {
            this.logCsvFileData({ file, action: data[file], csv: "[]" });
          });
      });
    });
  };
}
module.exports = Importer;
