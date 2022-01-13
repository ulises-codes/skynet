#!/usr/bin/env node
import createNewPost from './createNewPost'

const args = process.argv.slice(2)

switch (args[0]) {
  case 'create':
    createNewPost(args[1])

    break
}
