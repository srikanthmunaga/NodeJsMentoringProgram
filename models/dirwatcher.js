import EventEmitter from "events";
import fs from "fs";
import { FILE_ADDED, FILE_MODIFIED, FILE_DELETED } from "./../config/constants";

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.fileStats = {};
    this.fileStatsTemp = {};
    this.timerInterval;
  }
  checkIndividualFileStatus = file => {
    const fileLastModifiedTimeStamp = this.fileStats[file];
    const fileOriginalTimeStamp = this.fileStatsTemp[file];
    if (!fileLastModifiedTimeStamp) {
      return { [file]: FILE_ADDED };
    } else if (!fileOriginalTimeStamp) {
      return { [file]: FILE_DELETED };
    } else if (fileOriginalTimeStamp !== fileLastModifiedTimeStamp) {
      return { [file]: FILE_MODIFIED };
    }
  };
  watchPath = (filePath, timerDelay) => {
    this.timerInterval = setInterval(() => {
      this.checkDirectoryForFiles(filePath);
    }, timerDelay);
  };
  unWatchPath = () => {
    clearInterval(this.timerInterval);
  };
  checkDirectoryForFiles = filePath => {
    var files = fs.readdirSync(filePath);
    if (files.length) {
      const fileStatsTemp1 = [];
      files.forEach(file => {
        let fileStat = fs.statSync(`${filePath}/${file}`);
        if (!fileStat.isDirectory()) {
          this.fileStatsTemp[`${filePath}/${file}`] = fileStat.mtime.valueOf();
          fileStatsTemp1.push(`${filePath}/${file}`);
        }
      });
      Promise.all(fileStatsTemp1).then(files => {
        let changedFiles = {};
        files.map(file => {
          changedFiles = {
            ...changedFiles,
            ...this.checkIndividualFileStatus(file)
          };
        });
        this.fileStats = Object.assign({}, this.fileStatsTemp);
        this.fileStatsTemp = {};
        if (Object.keys(changedFiles).length) {
          this.emit("fileChange", changedFiles);
        }
      });
    }
  };
}
module.exports = DirWatcher;
