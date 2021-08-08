#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { join } from "path";

yargs(hideBin(process.argv))
    .scriptName("@jy95/i18n-tools")
    .commandDir(join(__dirname, "cmds"), {
        extensions: ["js", "ts"],
        visit(commandModule) {
            return commandModule.default;
        }
    })
    .demandCommand()
    .help()
    .argv