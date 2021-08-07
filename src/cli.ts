#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .commandDir('cmds', {
        extensions: process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js'],
    })
    .demandCommand()
    .help()
    .argv