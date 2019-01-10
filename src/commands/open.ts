import {Command, flags} from '@oclif/command'
import opn = require('opn')
import * as git from 'nodegit' 


export default class Open extends Command {
  static description = 'Open repository in bitbucket'

  static examples = [
    `$ bitbucket-cli open
open world from ./src/open.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    path: flags.string({char: 'p', description: 'path to project', required: true}),
    server: flags.string({char: 's', description: 'bitbucket server', required: true}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Open)
    const server = flags.server
    const path = flags.path

    const repository = git.Repository.open(path)

    const url = await repository.then((repository: any) => {
      return repository.config()
    }).then((config: git.Config) => {
      return config.getStringBuf('remote.origin.url')
    }).then((url: git.Buf) => {
      const matches = url.toString().match(/(ssh|http|https):\/\/.*\/(.*)\/(.*).git/)

      if(!matches) {
        throw Error(`Unable to parse repository path ${url}`)
      }

      const project = matches[2]
      const repository = matches[3]
      const projectUrl = `${server}/projects/${project}/repos/${repository}/browse`

      return projectUrl
    }).then((url: string) => {
      opn(url, {wait: false})
    }).catch((reason: any) => {
      console.log(`${reason}`)
    });

  }
}
