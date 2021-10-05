import { readFileSync } from 'fs';
import { extname, resolve } from 'path';

// For typing
// eslint-disable-next-line
import type { Argv } from "yargs";

export default class CommandBuilder {
  y: Argv<{ [x: string]: any }>; // current yargs result

  constructor(y: Argv<{ [x: string]: any }>) {
    this.y = y;
  }

  addSettingConfig() {
    this.y = this.y.config('settings', function (configPath) {
      let ext = extname(configPath);
      return /\.js$/i.test(ext)
        ? require(configPath)
        : JSON.parse(readFileSync(configPath, 'utf-8'));
    });
    return this;
  }

  addOutputDirOption(multiple = false) {
    this.y = this.y
      .option('outputDir', {
        type: 'string',
        alias: 'od',
        describe: `Output folder where to store the output ${
          multiple ? 'file(s)' : 'file'
        }`,
        default: process.cwd(),
      })
      // coerce path provided by outputDir
      .coerce(['outputDir'], resolve);
    return this;
  }

  addKeySeparatorOption() {
    this.y = this.y.option('keySeparator', {
      type: 'string',
      alias: 'ks',
      describe: 'Char to separate i18n keys',
      default: '.',
    });
    return this;
  }

  build() {
    return this.y;
  }
}
