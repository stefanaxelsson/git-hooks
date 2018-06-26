#!/usr/bin/env node
const { execGitCmd } = require("./util");
const fs = require("fs");

const ISSUE_PATTERN = /([a-z]+\-[0-9]+)/i;
const NON_ISSUE_PATTERN = /^(Merged?|NO-JIRA)/;

const getIssueNumber = input => {
  const matches = ISSUE_PATTERN.exec(input);
  return matches !== null ? matches[0] : "";
};

const currentBranchResults = execGitCmd(["rev-parse", "--abbrev-ref", "HEAD"]);
const currentBranch = currentBranchResults.length
  ? currentBranchResults[0]
  : "";
const commitMessage = fs.readFileSync(process.argv[2], "utf8");

const branchIssue = getIssueNumber(currentBranch);
const commitIssue = getIssueNumber(commitMessage);

if (
  branchIssue &&
  (branchIssue !== commitIssue && !NON_ISSUE_PATTERN.test(commitMessage))
) {
  console.log(
    `Commit message must include ${branchIssue} or start with 'Merged' or 'NO-JIRA'.`
  );
  process.exit(1);
} else if (
  !NON_ISSUE_PATTERN.test(commitMessage) &&
  !ISSUE_PATTERN.test(commitMessage)
) {
  console.log(
    `Commit message must include a valid issue (ISSUE-123) or start with 'Merged' or 'NO-JIRA'.`
  );
  process.exit(1);
}
