#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const basePath = path.dirname(__filename);
const gitHooksPath = path.join(basePath, "../.git/hooks");
const scriptsPath = path.join(basePath, "../scripts");

const commitMsgHookPath = path.join(gitHooksPath, "commit-msg");
const commitMsgScriptsPath = path.join(scriptsPath, "commit-msg.js");

if (!fs.existsSync(commitMsgHookPath)) {
  fs.symlinkSync(commitMsgScriptsPath, commitMsgHookPath);
  console.log("commit-msg hook installed to ", commitMsgScriptsPath);
}