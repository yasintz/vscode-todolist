const { exec } = require("child_process");
const { version, name } = require("../package.json");
const vsixName = name + "-" + version + ".vsix";
const cmdCommand = "code --install-extension " + vsixName;

const cmdProcess = exec(cmdCommand);

cmdProcess.stdout.pipe(process.stdout);
cmdProcess.stderr.pipe(process.stderr);
