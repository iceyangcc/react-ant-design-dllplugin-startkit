var async = require("async");
var fs = require("fs");
var path = require("path");
// cursively make dir
function mkdirs(p, mode, f, made) {
  if (typeof mode === 'function' || mode === undefined) {
    f = mode;
    mode = 0777 & (~process.umask());
  }
  if (!made)
    made = null;

  var cb = f || function () {};
  if (typeof mode === 'string')
    mode = parseInt(mode, 8);
  p = path.resolve(p);

  fs.mkdir(p, mode, function (er) {
    if (!er) {
      made = made || p;
      return cb(null, made);
    }
    switch (er.code) {
    case 'ENOENT':
      mkdirs(path.dirname(p), mode, function (er, made) {
        if (er) {
          cb(er, made);
        } else {
          mkdirs(p, mode, cb, made);
        }
      });
      break;

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
    default:
      fs.stat(p, function (er2, stat) {
        // if the stat fails, then that's super weird.
        // let the original error be the failure reason.
        if (er2 || !stat.isDirectory()) {
          cb(er, made);
        } else {
          cb(null, made)
        };
      });
      break;
    }
  });
}
// single file copy
function copyFile(file, toDir, cb) {
  async.waterfall([
      function (callback) {
        fs.exists(toDir, function (exists) {
          if (exists) {
            callback(null, false);
          } else {
            callback(null, true);
          }
        });
      }, function (need, callback) {
        if (need) {
          mkdirs(path.dirname(toDir), callback);
        } else {
          callback(null, true);
        }
      }, function (p, callback) {
        var reads = fs.createReadStream(file);
        var writes = fs.createWriteStream(path.join(path.dirname(toDir), path.basename(file)));
        reads.pipe(writes);
        //don't forget close the  when  all the data are read
        reads.on("end", function () {
          writes.end();
          callback(null);
        });
        reads.on("error", function (err) {
          console.log("读取文件错误: ");
          callback(true, err);
        });

      }
    ], cb);

}

// cursively count the  files that need to be copied

function _ccoutTask(from, to, cbw) {
  async.waterfall([
      function (callback) {
        fs.stat(from, callback);
      },
      function (stats, callback) {
        if (stats.isFile()) {
          cbw.addFile(from, to);
          callback(null, []);
        } else if (stats.isDirectory()) {
          fs.readdir(from, callback);
        }
      },
      function (files, callback) {
        if (files.length) {
          for (var i = 0; i < files.length; i++) {
            _ccoutTask(path.join(from, files[i]), path.join(to, files[i]), cbw.increase());
          }
        }
        callback(null);
      }
    ], cbw);

}
// wrap the callback before counting
function ccoutTask(from, to, cb) {
  var files = [];
  var count = 1;

  function wrapper(err) {
    count--;
    if (err || count <= 0) {
      cb(err, files)
    }
  }
  wrapper.increase = function () {
    count++;
    return wrapper;
  }
  wrapper.addFile = function (file, dir) {
    files.push({
      file : file,
      dir : dir
    });
  }

  _ccoutTask(from, to, wrapper);
}


function copyDir(from, to, cb) {
    if(!cb){
    cb=function(){};
  }
  async.waterfall([
      function (callback) {
        fs.exists(from, function (exists) {
          if (exists) {
            callback(null, true);
          } else {
            console.log(from + " not exists");
            callback(true);
          }
        });
      },
      function (exists, callback) {
        fs.stat(from, callback);
      },
      function (stats, callback) {
        if (stats.isFile()) {
          // one file copy
          copyFile(from, to, function (err) {
            if (err) {
              // break the waterfall
              callback(true);
            } else {
              callback(null, []);
            }
          });
        } else if (stats.isDirectory()) {
          ccoutTask(from, to, callback);
        }
      },
      function (files, callback) {
                // prevent reaching to max file open limit
        async.mapLimit(files, 10, function (f, cb) {
          copyFile(f.file, f.dir, cb);
        }, callback);
      }
    ], cb);
}

function deleteFolderRecursive(url) {
  var files = []
  if (fs.existsSync(url) ) {
    //返回文件和子目录的数组
    files = fs.readdirSync(url)
    files.forEach(function(file, index){
      // var curPath = url + "/" + file;
      var curPath = path.join(url, file)
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    //清除文件夹
    fs.rmdirSync(url)
  } else {
    console.log(url)
    // console.log("给定的路径不存在，请给出正确的路径");
  }
}

function deleteFilesInDir(url) {
  var files = []
  if (fs.existsSync(url) ) {
    //返回文件和子目录的数组
    files = fs.readdirSync(url)
    files.forEach(function(file, index){
      // var curPath = url + "/" + file;
      var curPath = path.join(url, file)
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
  } else {
    console.log(url)
    // console.log("给定的路径不存在，请给出正确的路径");
  }
}

/* 把某个文件夹下的文件替换字符串 */
function replaceStr(fileDir, strReg, withStr, cb) {
  var files = []
  if (fs.existsSync(fileDir)) {
    files = fs.readdirSync(fileDir)
    console.log('文件个数是: ', files.length, files)
    files.forEach(function(fileName, index) {
      var curPath = path.join(fileDir, fileName)
      replaceStrInFile(curPath, strReg, withStr, curPath,  cb)
    })
  } else {
    console.log('给定的路径不存在, 请给出正确的路径!')
  }
}

/* 替换文件中的某些字符串写入到新的地方 */
/**
 * 替换某个文件夹下所有文件
 * @param {*} filePath 文件夹路径
 * @param {*} strReg 
 * @param {*} withStr 
 * @param {*} writePath 
 * @param {*} cb 
 */
function replaceStrInFile(filePath, strReg, withStr, writePath, cb) {
  var strFile = fs.readFileSync(filePath, "utf-8")
  // console.log(strFile)
  var resultStr = strFile.replace(strReg, withStr)
  writePath && fs.writeFile(writePath, resultStr, function() {
    console.log('============== ^ _ ^ 替换文件中的字符串完成!')
    cb && cb()
  })
  return resultStr
}

module.exports = {
  copyFile: copyFile,

  replaceStrInDir: replaceStr,

  replaceStrInFile: replaceStrInFile,

  makeDir: function(dirName) {
    if (fs.existsSync(dirName)) {
      // console.log('目录已经存在: ' + dirName);
    } else {
      fs.mkdirSync(dirName);
    }
  },

  writeFileToPath(fromFile, toFile, cb) {
    var strFile = fs.readFileSync(fromFile, "utf-8")
    fs.writeFile(toFile, strFile, cb)
  },

  deleteFilesInDir: deleteFilesInDir,

  deleteFile: function(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  },

  copyDir: function(fromDir, toDir, callback) {
    var start = new Date().getTime();
    copyDir(fromDir, toDir, function (err) {
      if (err) {
        console.log("拷贝出错");
        console.dir(err);
      } else {
        // console.log("拷贝成功");
        // console.log("用时:" + (new Date().getTime() - start))
        callback && callback()
      }
    })
  }
}
