const core = require("@actions/core");
const github = require("@actions/github");

const org = core.getInput("organization", { required: true });
const username = core.getInput("username", { required: true });
const token = core.getInput("token", { required: true });
const team_slug = core.getInput("team_slug", { required: true });

const octokit = new github.getOctokit(token);

main();

async function main() {
  const { data: members } = checkStatus(
    await octokit.rest.teams.listMembersInOrg({
      org,
      team_slug,
    })
  );
  const isMember = members.some(({ login }) => login === username);
  core.setOutput("result", isMember ? "true" : "false");
}

function checkStatus(result) {
  if (result.status >= 200 && result.status < 300) {
    return result;
  }

  core.setFailed(`Received status ${result.status} from API.`);
  process.exit();
}