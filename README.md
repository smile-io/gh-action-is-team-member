# GH action is team member

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

## Outputs

## `result`

The result in either true or false.

## Example usage

    uses: actions/gh-action-is-team-member@v0.1
    with:
        organization: 'smile-io'
        username: 'username'
        token: {{ secrets.GH_TOKEN }}
        team_slug: 'team'