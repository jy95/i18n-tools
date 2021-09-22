import { readFileSync } from 'fs';
import { extname } from 'path';

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

  build() {
    return this.y;
  }
}
