const core = require("@actions/core");
const github = require("@actions/github");

// const org = core.getInput("organization", { required: true });
// const username = core.getInput("username", { required: true });
// const token = core.getInput("token", { required: true });
// const team_slug = core.getInput("team_slug", { required: true });


const token = "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"
const team_slug = "site-reliability-engineers"
const username = "xurtasun"
const org = "smile-io"
const pull_number = "1580"
const repo = "smile-ui"

const regex = /(?=\w)[A-z]*[-](?=\D*\d)[0-9]*/

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
  console.log(`Is ${username} member of ${team_slug}? ${isMember}`)
  core.setOutput("result", isMember ? "true" : "false");
  const {data} = await getPR()
  let jiraIssue = parse(data.body)
  if (jiraIssue == null) jiraIssue = parse(data.head.ref)
  core.setOutput("jiraTicket", jiraIssue ? jiraIssue[0] : "JIRA-404");
  console.log(`JIRA ISSUE: ${jiraIssue ? jiraIssue[0] : "JIRA-404"}`)
}

async function getPR() {
  return await octokit.rest.pulls.get({
    owner : org,
    repo,
    pull_number
  })
}

function parse(text) {
  return text.match(regex)
}

function checkStatus(result) {
  if (result.status >= 200 && result.status < 300) {
    return result;
  }

  core.setFailed(`Received status ${result.status} from API.`);
  process.exit();
}