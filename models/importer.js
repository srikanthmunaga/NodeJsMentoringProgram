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
        if (this.async) {
          this.import(file)
            .then(csv => {
              this.logCsvFileData({ file, action: data[file], csv });
            })
            .catch(error => {
              this.logCsvFileData({ file, action: data[file], csv: "[]" });
            });
        } else {
          let csv;
          try {
            csv = this.importSync(file);
          } catch (err) {
            csv = "[]";
          }
          this.logCsvFileData({ file, action: data[file], csv });
        }
      });
    });
  };
}
export default Importer;
