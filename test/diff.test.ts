import os from 'os';
import path from 'path';
import yargs from 'yargs';
import set from 'lodash/set';
import unset from 'lodash/unset';
// diff command
import {
  command,
  description as describeText,
  builder,
  handler,
} from '../src/cmds/diff';

// temp folder
const TEMP_FOLDER = os.tmpdir();
// test folders constants
const ROOT_TEST_FOLDER = 'tests-for-diff';
const [VALID_TEST_FOLDER, USELESS_TEST_FOLDER] = [
  'correct', // folder where every file are correct
  'useless', // folder where file has an useless content ([])
];

// initialise fsify
const fsify: {
  [x: string]: any;
  DIRECTORY: any;
  FILE: any;
  (_: { [x: string]: any }): Promise<any>;
} = require('fsify')({
  cwd: TEMP_FOLDER,
  persistent: false,
  force: true,
});

// Build the parser used for that command
const parser = yargs.command(command, describeText, builder, handler).help();

// to concat faster command
type concat_cmd_type = (args: string[]) => string;
type prepare_mandatory_args_type = (...args: string[]) => string[];
const concat_cmd: concat_cmd_type = (args: string[]) =>
  `diff ${args.join(' ')}`;
const prepare_mandatory_args: prepare_mandatory_args_type = (...files) => [
  ...files.map(file => `"${file}"`),
];

// return the output of a given command to the parser
function fetchOutput(cmd: string): Promise<string> {
  return new Promise(resolve => {
    parser.parse(cmd, (_err: Error | undefined, _argv: any, output: string) => {
      resolve(output);
    });
  });
}

// makes assertions on errors
async function expectError(cmd: string, ...messages: string[]) {
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
}

// type for fsify structure
type fsify_structure = {
  type: any;
  name: string;
  contents: string | fsify_structure;
}[];

// to access easier the paths of test file paths
const test_files_list = [
  'file1.json',
  'file2.json', 
  'file3.json',
  // to test out the json reporter
  'settings1-JSON.json',
  'settings2-JSON.json'
  // TODO test out future reporters
] as const;
const [
  TEST_FILE_FILE1, 
  TEST_FILE_FILE2, 
  TEST_FILE_FILE3,
  TEST_FILE_JSON_SETTINGS1,
  //TEST_FILE_JSON_SETTINGS2,
] = test_files_list;
type test_files_type = typeof test_files_list[number];

// files path
const TEST_FILES: { [x in test_files_type]: string } = test_files_list.reduce(
  (acc: any, curr: test_files_type, idx: number) => {
    acc[curr] = path.resolve(
      TEMP_FOLDER, 
      ROOT_TEST_FOLDER,
      (idx < 5) ? VALID_TEST_FOLDER : USELESS_TEST_FOLDER,
      curr
    );
    return acc;
},{});

// generate contents for comparison
const generate_i18_contents = (idx: number) => {
  return [
    ['untouchedKey', 'Hello World'],
    ['commons.nestedKey.changedValue', 'Changed value ' + idx],
    ['commons.array[0]', 'Pierre'],
    ['commons.array[1]', idx > 0 ? 'Paul' : undefined],
    ['commons.array[2]', idx > 1 ? 'Jacques' : undefined],
    ['commons.conditionalDeletedKey', idx % 2 === 0 ? 'Present' : undefined],
  ].reduce((acc: { [x: string]: any }, [key, value]) => {
    if (value !== undefined) {
      set(acc, key as string, value);
    } else {
      unset(acc, key as string);
    }
    return acc;
  }, {});
};

// file structure for fsify, in order to run the tests
const structure: fsify_structure = [
  {
    type: fsify.DIRECTORY,
    name: ROOT_TEST_FOLDER,
    contents: [
      // In this folder, everything in correct
      {
        type: fsify.DIRECTORY,
        name: VALID_TEST_FOLDER,
        contents: [
          ...[TEST_FILE_FILE1, TEST_FILE_FILE2, TEST_FILE_FILE3].map(
            (file: string, idx: number) => ({
              type: fsify.FILE,
              name: file,
              contents: JSON.stringify(generate_i18_contents(idx)),
            })
          ),
          // With two files
          {
            type: fsify.FILE,
            name: TEST_FILE_JSON_SETTINGS1,
            contents: JSON.stringify({
              filename: "diff_settings1",
              outputDir: TEMP_FOLDER,
              outputFormat: "JSON",
              files: [TEST_FILE_FILE1, TEST_FILE_FILE2].map(file => TEST_FILES[file])
            })
          }
        ],
      },
    ],
  },
];

// test scenarios for validations
const VALIDATIONS_SCENARIOS : [
  string,
  [test_files_type[], ...string[]],
  ...string[]
][] = [
  [
    // Test out the message : "At least two paths must be provided"
    'Argument files - Not expected number of paths should be reject',
    [[TEST_FILE_FILE1]],
    "At least two paths must be provided"
  ]
];

beforeAll(() => {
  // write temporary files
  return fsify(structure);
});

describe('[diff command]', () => {

    describe('Check command availability', () => {

      it('Should display diff help output', async () => {
        const output = await fetchOutput('diff --help');
        expect(output).toMatch(describeText);
      });

    });

    describe('Validations', () => {
      // mock console.log
      let consoleLog: any;
      beforeAll(() => {
        consoleLog = jest.spyOn(console, 'log').mockImplementation();
      });
  
      // restore console.log
      afterAll(() => {
        if (consoleLog !== undefined) {
          consoleLog.mockRestore();
        }
      });

      test.each(VALIDATIONS_SCENARIOS)('%s', async(_title: string, args: [test_files_type[], ...string[]],...messages: string[]) => {
        let [files, ...otherArgs] = args;
        let test_cmd = concat_cmd([
          // optional args
          ...otherArgs,
          // mandatory args
          ...prepare_mandatory_args(...files.map(file => TEST_FILES[file]))
        ]);
        //console.warn(test_cmd);
        // Test out if error message is thrown
        await expectError(test_cmd, ...messages);
      });

    });

});