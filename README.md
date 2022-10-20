# Smile Internal Action: check if user is member of team organisation

Smile Internal Github Action to publish an application helm chart to Smile's helm repository.

Note: This action is NOT intended for use outside of Smile, and no support will be offered for such use. External pull requests will not be accepted.

This action returns true or false if a member is inside a gh team.

## Inputs

## `organization`

**Required** The name of the organization. Default `"smile-io"`.

## `username`

**Required** The username you want to check belongs to the team.

## `token`

**Required** GitHub access token.

## `team_slug`

**Required** The team slug you want to check the username.

## `pull_request_number`

**Required** Pull request number.

## `repository`

**Required** Pull request repository.

## Outputs

## `result`

The result in either true or false.

## `jiraIssue`

The jira issue number.

## Example usage

    uses: actions/gh-action-is-team-member@v0.1
    with:
        organization: 'smile-io'
        username: 'username'
        token: {{ secrets.GH_TOKEN }}
        team_slug: 'team'
        repository: 'repository'
        pull_request_number: 'JIRA-404'
