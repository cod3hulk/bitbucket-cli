import {Command, flags} from '@oclif/command'
const opn = require('opn')
const gitRemoteOriginUrl = require('git-remote-origin-url');

export default class Open extends Command {
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

  async run() {
    const {args, flags} = this.parse(Open)
    const server = flags.server
    const path = flags.path

    gitRemoteOriginUrl(path).then(url => {
        const matches = url.match(/ssh:\/\/git@.*\/(.*)\/(.*).git/)
        const project = matches[1]
        const repository = matches[2]
        const projectUrl = `${server}/projects/${project}/repos/${repository}/browse`
        opn(projectUrl, { wait: false })
    }).catch(error => {console.log(error)});
  }
}
