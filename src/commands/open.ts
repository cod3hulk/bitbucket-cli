import {Command, flags} from '@oclif/command'

export default class Open extends Command {
  static description = 'Open repository in bitbucket'

  static examples = [
    `$ bitbucket-cli open
open world from ./src/open.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    path: flags.string({char: 'd', description: 'path to project'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Open)

    const name = flags.name || 'world'
    this.log(`open ${name} from ./src/commands/open.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
