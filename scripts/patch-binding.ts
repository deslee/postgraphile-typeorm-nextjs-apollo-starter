// temporary workaround for

'use strict'

import * as fs from 'fs';

type FindAndReplace = {
    find: string,
    replace: string
}

const findAndReplace: FindAndReplace[] = [
    {
        find: `import schema from  '..\\embeddedPostgraphile\\index'`,
        replace: `import schema from  '../embeddedPostgraphile/index'`
    }
]
const disableTslint: string = '/* tslint:disable */'


const fileToPatch = 'src/generated/postgraphile.ts';

fs.readFile(fileToPatch, 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    let result = data.toString();

    findAndReplace.forEach(pairs => {
        var result = data.replace(pairs.find, pairs.replace);
        if (result === data) {
            console.log(`[bindingFix.js] can not find the line '${pairs.find}' for patching, skipping...`);
        }
        data = result;
    })

    if (data.startsWith(disableTslint)) {
        console.log(`[bindingFix.js] tslint is already disabled, skipping...`);
    } else {
        result = `${disableTslint}\n${data}`;
    }

    fs.writeFile(fileToPatch, result, 'utf8', function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
});
