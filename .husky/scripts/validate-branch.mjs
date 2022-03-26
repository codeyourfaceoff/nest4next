import { $ } from 'zx';

let DEBUG = false;
$.verbose = DEBUG;

const validBaseBranchRegex = /^(develop|main)$/gm;
const validImprovementBranchRegex =
  /^(feature|bugfix|improvement|library|prerelease|release|hotfix)(\/[a-z0-9._-]+){0,5}$/gm;
const validHWBranchRegex = /homework\/(.*?)\/(.*?)\/submission(\/.*)?$/gm;

let { stdout: nextBranch } = await $`echo "$(git rev-parse --abbrev-ref HEAD)"`;
nextBranch = nextBranch.trim();

let { stdout: currentBranch } =
  await $`echo "$(git rev-parse --abbrev-ref @{-1})"`;
currentBranch = currentBranch.trim();

if (nextBranch === currentBranch) process.exit(0);

DEBUG && console.log({ nextBranch, currentBranch });
DEBUG && console.log('Is next a valid branch:', isAllowed(nextBranch));
DEBUG && console.log('Is current a valid hw branch:', isAllowed(currentBranch));

if (!isAllowed(nextBranch)) {
  await notAllowedSwitchBack();
  process.exit(1);
}

DEBUG && console.log('Success');
process.exit(0);

async function notAllowedSwitchBack() {
  DEBUG && console.log('switching back');
  printError();
  await $`HUSKY_SKIP_HOOKS=1 git switch -`;
  await $`git branch -D ${nextBranch}`;
}

function isAllowed(branchName) {
  const [isValidBase, isValidImprov, isValidHw] = [
    validBaseBranchRegex,
    validImprovementBranchRegex,
    validHWBranchRegex,
  ].map((regex) => regex.test(branchName.trim()));

  return isValidBase || isValidImprov || isValidHw;
}

function printError() {
  console.log(`There is something wrong with your branch name '${nextBranch}'. Branch names in this project must adhere to one of these contracts: \n
=> ${validBaseBranchRegex.toString()}
=> ${validImprovementBranchRegex.toString()}
=> ${validHWBranchRegex.toString()}
You have been switched back to your previous branch '${currentBranch}'.
`);
}
