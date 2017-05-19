#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
// const godo = require('./indexx');
const fs = require('fs');


const fileName = './godolist.json'
const file = require(fileName);

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

var command = cli['input'][0];
var data = cli['input'].slice(1);


if (!command && data.length == 0) {
    for (var i=0; i < file['godos'].length; i++) {
        var item = file['godos'][i];
        var groups = '';
        if (item['groups']) {
            for (var j=0; j < item['groups'].length; j++) {
                groups += ' #' + item['groups'][j];
            }
        }
        var output = chalk.magenta(item['content']) + ' ' + chalk.cyan(groups)
        if (item['done']) {
            console.log(chalk.gray(chalk.stripColor(output)));
        } else {
            console.log(output);
        }
        // console.log(chalk.gray(item['content'] + ' ' + groups));
    }

} else if (command == 'add') {
    var content = data[0] || '';
    var groups = data.slice(1) || '';

    var numGodos = file['godos'].length;
    var id = 0;
    if (numGodos) {
        id = file['godos'][numGodos - 1]['id'] + 1;
    }

    var item = {id: id, content: data[0], groups: groups, done: false};
    file['godos'].push(item);

    var fileString = JSON.stringify(file, null, 4);
    fs.writeFile(fileName, fileString, function(err) {
        if (err) {
            console.log('unable to add godo 😮');
        } else {
            console.log('added godo ' + chalk.magenta(data[0]) + ' ✨');
        }
    });
}
