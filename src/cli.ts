#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .commandDir('cmds', {
        extensions: process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js'],
        /*
        visit(commandModule) {
            console.log(commandModule);
            return commandModule.default;
        }
        */
    })
    .demandCommand()
    .help()
    .argv