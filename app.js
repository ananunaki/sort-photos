const fs = require("fs");
const path = require("path");
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory
const dir = require("node-dir");
const ExifImage = require("exif").ExifImage;

function SortPhoto(source_DIR, result_DIR) {
  let absoluteSourcePath;
  let absoluteResultPath;
  if (source_DIR) absoluteSourcePath = path.resolve(source_DIR);
  else absoluteSourcePath = `${ABSPATH}/forsort/`;
  if (result_DIR) absoluteResultPath = path.resolve(result_DIR);
  else absoluteResultPath = `${ABSPATH}/sorted/`;
  return dir.readFilesStream(
    absoluteSourcePath,
    {
      match:
        /(.jpg|.mp4|.MP4|.jpg|.png|.avi|.gif|.dng|.JPG|.MOV|.PNG|.m4v|.NEF|.AVI|.jpeg)/,
      excludeDir: ["node_modules", "undefined", "sorted"],
      shortName: true,
    },
    function (err, content, next) {
      if (err) throw err;
      next();
    },
    function (err, files) {
      if (err) console.log(err);
      if (files.length !== 0) {
        files.forEach((file) => {
          let dirYear, dirMonth;
          new Promise(function (resolve, reject) {
            new ExifImage({ image: `${absoluteSourcePath}/${file}` }, function (
              error,
              exifData
            ) {
              if (error) {
                console.log("Error: " + error.message);
                reject();
              } else {
                resolve({
                  exifInfo: exifData
                    ? exifData.exif.DateTimeOriginal
                    : exifData.exif.ModifyDate,
                });
              }
            });
          })
            .then(async (sendInfo) => {
              dirYear = `${absoluteResultPath}/${sendInfo.exifInfo.slice(
                0,
                4
              )}`;
              dirMonth = `${dirYear}/${sendInfo.exifInfo.slice(
                5,
                7
              )}`;
              if (!fs.existsSync(absoluteResultPath)) {
                fs.mkdirSync(absoluteResultPath);
              }
              if (!fs.existsSync(dirYear)) {
                fs.mkdirSync(dirYear);
              }
              console.log(dirMonth);
              if (!fs.existsSync(dirMonth)) {
                fs.mkdirSync(dirMonth);
              }
              fs.renameSync(
                `${absoluteSourcePath}/${file}`,
                `${dirMonth}/${file}`
              );
            })
            .catch((error) => {
              console.error(error);
            });
        });
      }
    }
  );
}

exports.SortPhoto = SortPhoto;

// .mp4|.MP4|.jpg|.png|.avi|.gif|.dng|.JPG|.MOV|.PNG|.m4v|.NEF|.AVI|.jpeg
