bitbucket-cli
=============

CLI support for bitbucket

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bitbucket-cli.svg)](https://npmjs.org/package/bitbucket-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bitbucket-cli.svg)](https://npmjs.org/package/bitbucket-cli)
[![License](https://img.shields.io/npm/l/bitbucket-cli.svg)](https://github.com/cod3hulk/bitbucket-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bitbucket-cli
$ bitbucket-cli COMMAND
running command...
$ bitbucket-cli (-v|--version|version)
bitbucket-cli/0.0.1 darwin-x64 node-v10.11.0
$ bitbucket-cli --help [COMMAND]
USAGE
  $ bitbucket-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bitbucket-cli hello [FILE]`](#bitbucket-cli-hello-file)
* [`bitbucket-cli help [COMMAND]`](#bitbucket-cli-help-command)

## `bitbucket-cli hello [FILE]`

describe the command here

```
USAGE
  $ bitbucket-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ bitbucket-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/cod3hulk/bitbucket-cli/blob/v0.0.1/src/commands/hello.ts)_

## `bitbucket-cli help [COMMAND]`

display help for bitbucket-cli

```
USAGE
  $ bitbucket-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_
<!-- commandsstop -->
