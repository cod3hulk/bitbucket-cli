import {Command, flags} from '@oclif/command'
const opn = require('opn')
import * as git from 'nodegit' 

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
    const path = flags.path || 'none'

    const repository = git.Repository.open(path)

    const url = await repository.then((repository: any) => {
      return repository.config()
    }).then((config: git.Config) => {
      return config.getStringBuf('remote.origin.url')
    }).then((url: git.Buf) => {
      return url
    });

    const reference = await repository.then((repository: git.Repository) => {
      return repository.getCurrentBranch()
    }).then((reference: git.Reference) => {
      return reference.shorthand()
    });

    console.log(url)
    console.log(reference)
  }
}
