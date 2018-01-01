const execFileSync = require("child_process").execFileSync;

const exec = (command, args) => {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: "pipe",
    encoding: "utf-8"
  };
  return execFileSync(command, args, options);
};

const execGitCmd = args =>
  exec("git", args)
    .trim()
    .toString()
    .split("\n");

module.exports = {
  exec,
  execGitCmd
};