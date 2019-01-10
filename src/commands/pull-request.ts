import {Command, flags} from '@oclif/command'
const opn = require('opn')
const gitRemoteOriginUrl = require('git-remote-origin-url');

export default class PullRequest extends Command {
  static description = 'Open repository in bitbucket'

  static examples = [
    `$ bitbucket-cli open
open world from ./src/open.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    path: flags.string({char: 'p', description: 'path to project'}),
    server: flags.string({char: 's', description: 'bitbucket server'}),
  }

  static args = [{name: 'file'}]

  createPullRequest() : object {
    const fromRef = {
      'id': 'branch',
      'repository': {
        'slug': 'repository',
        'project': {
          'key': 'project'
        }
      }
    }

    const toRef = {
      'id': 'master',
      'repository': {
        'slug': 'repository',
        'project': {
          'key': 'project'
        }
      }
    }

    return {
      'title': fromRef.id,
      'description': 'description',
      'fromRef': fromRef,
      'toRef': toRef,
      'reviewers': 'reviewers'
    }
  }

  async run() {
    const {args, flags} = this.parse(PullRequest)
    const server = flags.server
    const path = flags.path

    console.log(this.createPullRequest())

  }
}
