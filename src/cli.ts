#!/usr/bin/env node

import yargs from "yargs";

yargs
    .scriptName("i18n_tools")
    .help()
    .command(require("./commands/export"))
    .argv