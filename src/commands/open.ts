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

    gitRemoteOriginUrl(path).then((url: string) => {
      const matches = url.match(/(ssh|http|https):\/\/.*\/(.*)\/(.*).git/)

      if(!matches) {
        throw Error(`Unable to parse repository path ${path}`)
      }

      const project = matches[2]
      const repository = matches[3]
      const projectUrl = `${server}/projects/${project}/repos/${repository}/browse`

      return projectUrl
    }).then((url: string) => {
      return opn(url, { wait: false })
    }).catch((error: any) => {
      console.log(`${error}`)
    });
  }
}
