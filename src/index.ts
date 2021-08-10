#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import exportCmd from './cmds/export';

/* eslint-disable  @typescript-eslint/no-unused-expressions */
yargs(hideBin(process.argv))
  .scriptName('@jy95/i18n-tools')
  // commandDir doesn't work very well in Typescript
  .command(exportCmd)
  .demandCommand()
  .help().argv;
