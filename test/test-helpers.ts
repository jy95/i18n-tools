// to make testing simpler in the future

import os from 'os';
// type for yargs parser
import type { Argv } from 'yargs';

// temp folder
export const TEMP_FOLDER = os.tmpdir();

// for correct / wrong stuff
export const [VALID_TEST_FOLDER, USELESS_TEST_FOLDER] = [
  'correct', // folder where every file are correct
  'useless', // folder where file has an useless content ([])
];

// initialise fsify
export const fsify: {
  [x: string]: any;
  DIRECTORY: any;
  FILE: any;
  (_: { [x: string]: any }): Promise<any>;
} = require('fsify')({
  cwd: TEMP_FOLDER,
  persistent: false,
  force: true,
});

// return the output of a given command to the parser
export const fetchOutput =
  (parser: Argv) =>
  (cmd: string): Promise<string> => {
    return new Promise((resolve) => {
      parser.parse(
        cmd,
        (_err: Error | undefined, _argv: any, output: string) => {
          resolve(output);
        }
      );
    });
  };

// makes assertions on errors
export const expectError =
  (parser: Argv) =>
  async (cmd: string, ...messages: string[]) => {
    // error to be retrieve
    let error: any = undefined;
    // In tests, I had to make sure yargs doesn't override error for the following reason :
    // Even when validation failed, it somehow can go to handler()
    let isFirstError = true;

    // add fail() handler
    // Because of problem explained above, I had to ignore if an error occurs afterwards
    try {
      await parser
        .fail((_, e) => {
          if (isFirstError) {
            isFirstError = false;
            error = e;
          }
        })
        .parseAsync(cmd);
    } catch (_) {}
    // check if error was set
    expect(error).not.toEqual(undefined);
    // check if it is an error Object
    expect(error).toHaveProperty('message');
    // check if error message contains expected element
    for (let expectedStr of messages) {
      expect((error as Error).message).toMatch(expectedStr);
    }
  };

// type for fsify structure
export type fsify_structure = {
  type: any;
  name: string;
  contents: string | fsify_structure;
}[];
