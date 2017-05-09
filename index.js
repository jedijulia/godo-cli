#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');

const cli = meow(`
    Usage
      $ ${chalk.magenta('godo')} ${chalk.yellow('add')} "item"                 ${chalk.gray('# add a godo')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('add')} "item" group group2    ${chalk.gray('# add a godo to one or more groups')}

      $ ${chalk.magenta('godo')}                            ${chalk.gray('# list all godos')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('group')}                      ${chalk.gray('# list all godos in a group')}

      $ ${chalk.magenta('godo')} ${chalk.yellow('done')} 0                     ${chalk.gray('# mark godo at index as done')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('done')} group                 ${chalk.gray('# mark all godos in a group as done')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('undone')} 0                   ${chalk.gray('# undo mark godo at index as done')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('undone')} group               ${chalk.gray('# undo mark godos in a group as done')}

      $ ${chalk.magenta('godo')} ${chalk.yellow('clear')}                      ${chalk.gray('# delete all godos')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('delete')} 0                   ${chalk.gray('# delete godo at index')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('delete')} group               ${chalk.gray('# delete all godos in a group')}

      $ ${chalk.magenta('godo')} ${chalk.yellow('clean')}                      ${chalk.gray('# delete all godos marked as done')}
      $ ${chalk.magenta('godo')} ${chalk.yellow('clean')} group                ${chalk.gray('# delete all godos marked as done in a group')}
`);
