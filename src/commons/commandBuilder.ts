// For typing
// eslint-disable-next-line
import type { Argv } from "yargs";

export default class CommandBuilder {
  y: Argv<{ [x: string]: any }>; // current yargs result

  constructor(y: Argv<{ [x: string]: any }>) {
    this.y = y;
  }

  build() {
    return this.y;
  }
}
