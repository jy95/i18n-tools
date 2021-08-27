#!/usr/bin/env node
/* istanbul ignore file */
// Simple way to test this file : node dist/index.js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import exportCmd from './cmds/export';
import importCmd from "./cmds/import";

/* eslint-disable  @typescript-eslint/no-unused-expressions */
yargs(hideBin(process.argv))
  .scriptName('@jy95/i18n-tools')
  // commandDir doesn't work very well in Typescript
  .command(exportCmd)
  .command(importCmd)
  .demandCommand()
  .help().argv;
