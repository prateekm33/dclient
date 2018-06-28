const fs = require("fs");
const configExamplePath = "config_example/";
const configPath = "config/";

readAndCreateDir("", configExamplePath, configPath);

function readAndCreateDir(name, examplePath, realPath) {
  fs.mkdir(realPath + name, (err, success) => {
    if (err) throw err;
    fs.readdir(examplePath + name, (err, contents) => {
      if (err) throw err;
      contents.forEach(content => {
        fs.stat(examplePath + name + "/" + content, (err, stats) => {
          if (err) throw err;
          if (stats.isDirectory())
            readAndCreateDir(content, examplePath + name, realPath + name);
          else if (stats.isFile())
            createFile(content, examplePath + name, realPath + name);
        });
      });
    });
  });
}

function createFile(name, examplePath, realPath) {
  fs.readFile(examplePath + name, "utf-8", (err, data) => {
    if (err) throw err;
    fs.writeFile(realPath + name, data, "utf-8", (err, success) => {
      if (err) throw err;
    });
  });
}
