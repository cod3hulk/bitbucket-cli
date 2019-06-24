import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
const opn = require('opn')
import * as git from 'nodegit' 
const axios = require('axios')

export default class PullRequest extends Command {
  static description = 'Open repository in bitbucket'

  static examples = [
    `$ bitbucket-cli open
open world from ./src/open.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    username: flags.string({char: 'u', description: 'username'}),
    password: flags.string({char: 'p', description: 'password'}),
    reviewers: flags.string({char: 'r', description: 'reviewers'}),
    path: flags.string({char: 'f', description: 'path to project'}),
    server: flags.string({char: 's', description: 'bitbucket server'}),
  }

  static args = [{name: 'file'}]

  createPullRequest(
    branch: String,
    repository: String,
    project: String,
    reviewers: Object,
    description: String
  ) : object {
    const fromRef = {
      'id': branch,
      'repository': {
        'slug': repository,
        'project': {
          'key': project
        }
      }
    }

    const toRef = {
      'id': 'master',
      'repository': {
        'slug': repository,
        'project': {
          'key': project  
        }
      }
    }

    return {
      'title': fromRef.id,
      'description': description,
      'fromRef': fromRef,
      'toRef': toRef,
      'reviewers': reviewers
    }
  }

  async run() {
    const {args, flags} = this.parse(PullRequest)
    const server = flags.server
    const path = flags.path || 'none'
    const username = flags.username
    const password = flags.password
    const reviewers = (flags.reviewers || '').split(',').map(function (n) { return { user: {name: n} } })
    const description = await cli.prompt('Please enter a description')

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

    const regex = /.*\/(.*)\/(.*)\.git/g
    const matches = regex.exec(String(url))
    const project = matches[1]
    const repo = matches[2]
    const repoInfo = {
      'project': project,
      'repository': repo,
      'branch': reference
    }

    const pullRequest = this.createPullRequest(
      repoInfo.branch,
      repoInfo.repository,
      repoInfo.project,
      reviewers,
      description
    )

    const pullRequestUrl =`${server}/${repoInfo.project}/repos/${repoInfo.repository}/pull-requests`

    axios.post(pullRequestUrl, pullRequest, {
      auth: {
        username: username,
        password: password
      }
    }).then( (response) => {
      if (response.status != 201) {
        console.log(`Error creating PR: ${response.data}`)
      } else {
        console.log('PR created!')
      }
    }).catch( (error) => {
       console.log(`Error creating PR: ${error.response.data.errors[0].message}`)
    })
  }
}
