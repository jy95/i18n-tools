import path from 'path';
import fs from 'fs';
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

// test helpers
import {
  TEMP_FOLDER,
  VALID_TEST_FOLDER,
  USELESS_TEST_FOLDER,
  expectError,
  fetchOutput,
  fsify_structure,
  fsify,
} from './test-helpers';

// test folders constants
const ROOT_TEST_FOLDER = 'tests-for-diff';

// Build the parser used for that command
const parser = yargs.command(command, describeText, builder, handler).help();

// to concat faster command
type concat_cmd_type = (args: string[]) => string;
type prepare_mandatory_args_type = (...args: string[]) => string[];
const concat_cmd: concat_cmd_type = (args: string[]) =>
  `diff ${args.join(' ')}`;
const prepare_mandatory_args: prepare_mandatory_args_type = (...files) => [
  ...files.map((file) => `"${file}"`),
];

// to access easier the paths of test file paths
const test_files_list = [
  'file1.json',
  'file2.json',
  'file3.json',
  // flat json, to test
  'flat_file1.json',
  'flat_file2.json',
  // to test out the json reporter
  'settings1-JSON.json',
  'settings2-JSON.json',
  'settings3-JSON.js',
  'settings4-JSON.json',
  // TODO test out future reporters
] as const;
const [
  TEST_FILE_FILE1,
  TEST_FILE_FILE2,
  TEST_FILE_FILE3,
  TEST_FILE_FLAT_FILE1,
  TEST_FILE_FLAT_FILE2,
  TEST_FILE_JSON_SETTINGS1,
  TEST_FILE_JSON_SETTINGS2,
  TEST_FILE_JSON_SETTINGS3,
  TEST_FILE_JSON_SETTINGS4,
] = test_files_list;
type test_files_type = typeof test_files_list[number];

// files path
const TEST_FILES: { [x in test_files_type]: string } = test_files_list.reduce(
  (acc: any, curr: test_files_type, idx: number) => {
    acc[curr] = path.join(
      TEMP_FOLDER,
      ROOT_TEST_FOLDER,
      idx < 10 ? VALID_TEST_FOLDER : USELESS_TEST_FOLDER,
      curr
    );
    return acc;
  },
  {}
);

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
              filename: 'diff_settings1-JSON',
              outputDir: TEMP_FOLDER,
              outputFormat: 'JSON',
              files: [TEST_FILE_FILE1, TEST_FILE_FILE2].map(
                (file) => TEST_FILES[file]
              ),
            }),
          },
          // With three files
          {
            type: fsify.FILE,
            name: TEST_FILE_JSON_SETTINGS2,
            contents: JSON.stringify({
              filename: 'diff_settings2-JSON',
              outputDir: TEMP_FOLDER,
              outputFormat: 'JSON',
              files: [TEST_FILE_FILE1, TEST_FILE_FILE2, TEST_FILE_FILE3].map(
                (file) => TEST_FILES[file]
              ),
            }),
          },
          // For cherry pick operations
          {
            type: fsify.FILE,
            name: TEST_FILE_JSON_SETTINGS4,
            contents: JSON.stringify({
              filename: 'diff_settings4-JSON',
              outputDir: TEMP_FOLDER,
              outputFormat: 'JSON',
              operations: ['PUT'], // only interessted by update operations
              files: [TEST_FILE_FILE1, TEST_FILE_FILE2].map(
                (file) => TEST_FILES[file]
              ),
            }),
          },
          // flat files
          {
            type: fsify.FILE,
            name: TEST_FILE_FLAT_FILE1,
            contents: JSON.stringify({
              'unchanged.key_with-special-char!': 'unchanged',
              'changed.key_test$': 'Hello',
            }),
          },
          {
            type: fsify.FILE,
            name: TEST_FILE_FLAT_FILE2,
            contents: JSON.stringify({
              'unchanged.key_with-special-char!': 'unchanged',
              'changed.key_test$': 'Bonjour',
            }),
          },
          // js file
          {
            type: fsify.FILE,
            name: TEST_FILE_JSON_SETTINGS3,
            contents: `module.exports = {
              filename: 'diff_settings3-JSON',
              outputDir: "${TEMP_FOLDER.replace(/\\/g, '\\\\')}",
              outputFormat: 'JSON',
              files: [${[TEST_FILE_FILE1, TEST_FILE_FILE2]
                .map((file) => `"${TEST_FILES[file].replace(/\\/g, '\\\\')}"`)
                .join(',')}]
            }`,
          },
        ],
      },
    ],
  },
];

// test scenarios for validations
const VALIDATIONS_SCENARIOS: [
  string,
  [test_files_type[], ...string[]],
  ...string[]
][] = [
  [
    // Test out the message : "At least two paths must be provided"
    'Argument files - Not expected number of paths should be reject',
    [[TEST_FILE_FILE1]],
    'At least two paths must be provided',
  ],
  [
    // Test out the message : "Option keySeparator should be a not-empty char"
    'Option keySeparator - Invalid separator should be rejected',
    [[TEST_FILE_FILE1, TEST_FILE_FILE2], '--keySeparator', `"HACKERMAN"`],
    'keySeparator',
    'not-empty char',
  ],
];

// E2E scenarios for JSON reporter
const E2E_JSON_REPORTER: [
  string,
  // if a single test_files_type, it is a settings file, multiple inline files otherwise
  [test_files_type[], ...string[]],
  string,
  any
][] = [
  [
    'Inline paths should be accepted',
    [
      [TEST_FILE_FILE1, TEST_FILE_FILE1],
      '--filename',
      `"diff_inline-JSON"`,
      '--outputDir',
      `"${TEMP_FOLDER}"`,
    ],
    path.join(TEMP_FOLDER, 'diff_inline-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FILE1],
        file2: TEST_FILES[TEST_FILE_FILE1],
      },
      changes: [],
    },
  ],
  [
    'should work with two files',
    [[TEST_FILE_JSON_SETTINGS1]],
    path.join(TEMP_FOLDER, 'diff_settings1-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FILE1],
        file2: TEST_FILES[TEST_FILE_FILE2],
      },
      changes: [
        {
          from: 'file1',
          key: 'commons.nestedKey.changedValue',
          newValue: 'Changed value 1',
          oldValue: 'Changed value 0',
          to: 'file2',
          type: 'REPLACED',
        },
        {
          from: 'file1',
          key: 'commons.conditionalDeletedKey',
          oldValue: 'Present',
          to: 'file2',
          type: 'DELETE',
        },
        {
          from: 'file1',
          key: 'commons.array[1]',
          newValue: 'Paul',
          to: 'file2',
          type: 'ADD',
        },
      ],
    },
  ],
  [
    'should work with three files',
    [[TEST_FILE_JSON_SETTINGS2]],
    path.join(TEMP_FOLDER, 'diff_settings2-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FILE1],
        file2: TEST_FILES[TEST_FILE_FILE2],
        file3: TEST_FILES[TEST_FILE_FILE3],
      },
      changes: [
        {
          key: 'commons.nestedKey.changedValue',
          type: 'REPLACED',
          from: 'file1',
          to: 'file2',
          oldValue: 'Changed value 0',
          newValue: 'Changed value 1',
        },
        {
          key: 'commons.conditionalDeletedKey',
          type: 'DELETE',
          from: 'file1',
          to: 'file2',
          oldValue: 'Present',
        },
        {
          key: 'commons.array[1]',
          type: 'ADD',
          from: 'file1',
          to: 'file2',
          newValue: 'Paul',
        },
        {
          key: 'commons.nestedKey.changedValue',
          type: 'REPLACED',
          from: 'file2',
          to: 'file3',
          oldValue: 'Changed value 1',
          newValue: 'Changed value 2',
        },
        {
          key: 'commons.array[2]',
          type: 'ADD',
          from: 'file2',
          to: 'file3',
          newValue: 'Jacques',
        },
        {
          key: 'commons.conditionalDeletedKey',
          type: 'ADD',
          from: 'file2',
          to: 'file3',
          newValue: 'Present',
        },
      ],
    },
  ],
  [
    'should work with js config file',
    [[TEST_FILE_JSON_SETTINGS3]],
    path.join(TEMP_FOLDER, 'diff_settings3-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FILE1],
        file2: TEST_FILES[TEST_FILE_FILE2],
      },
      changes: [
        {
          from: 'file1',
          key: 'commons.nestedKey.changedValue',
          newValue: 'Changed value 1',
          oldValue: 'Changed value 0',
          to: 'file2',
          type: 'REPLACED',
        },
        {
          from: 'file1',
          key: 'commons.conditionalDeletedKey',
          oldValue: 'Present',
          to: 'file2',
          type: 'DELETE',
        },
        {
          from: 'file1',
          key: 'commons.array[1]',
          newValue: 'Paul',
          to: 'file2',
          type: 'ADD',
        },
      ],
    },
  ],
  [
    'should work with flat json',
    [
      [TEST_FILE_FLAT_FILE1, TEST_FILE_FLAT_FILE2],
      '--filename',
      `"diff_flat_inline-JSON"`,
      '--outputDir',
      `"${TEMP_FOLDER}"`,
      '--keySeparator',
      `"false"`,
    ],
    path.join(TEMP_FOLDER, 'diff_flat_inline-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FLAT_FILE1],
        file2: TEST_FILES[TEST_FILE_FLAT_FILE2],
      },
      changes: [
        {
          from: 'file1',
          key: 'changed.key_test$',
          newValue: 'Bonjour',
          oldValue: 'Hello',
          to: 'file2',
          type: 'REPLACED',
        },
      ],
    },
  ],
  [
    'should respect user wanted operations for output',
    [[TEST_FILE_JSON_SETTINGS4]],
    path.join(TEMP_FOLDER, 'diff_settings4-JSON.json'),
    {
      files: {
        file1: TEST_FILES[TEST_FILE_FILE1],
        file2: TEST_FILES[TEST_FILE_FILE2],
      },
      changes: [
        {
          from: 'file1',
          key: 'commons.nestedKey.changedValue',
          newValue: 'Changed value 1',
          oldValue: 'Changed value 0',
          to: 'file2',
          type: 'REPLACED',
        },
      ],
    },
  ],
];

beforeAll(() => {
  // write temporary files
  return fsify(structure);
});

describe('[diff command]', () => {
  describe('Check command availability', () => {
    it('Should display diff help output', async () => {
      const output = await fetchOutput(parser)('diff --help');
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

    test.each(VALIDATIONS_SCENARIOS)(
      '%s',
      async (
        _title: string,
        args: [test_files_type[], ...string[]],
        ...messages: string[]
      ) => {
        let [files, ...otherArgs] = args;
        let test_cmd = concat_cmd([
          // optional args
          ...otherArgs,
          // mandatory args
          ...prepare_mandatory_args(...files.map((file) => TEST_FILES[file])),
        ]);
        //console.warn(test_cmd);
        // Test out if error message is thrown
        await expectError(parser)(test_cmd, ...messages);
      }
    );
  });

  describe('E2E successful scenarios', () => {
    // mock console.log
    let consoleLog: any;
    beforeAll(() => {
      consoleLog = jest.spyOn(console, 'log').mockImplementation();
    });

    // clear mock after each call
    afterEach(() => {
      consoleLog.mockClear();
    });

    // reenable console.log
    afterAll(() => {
      // restore console.log
      if (consoleLog !== undefined) {
        consoleLog.mockRestore();
      }
    });

    // JSON reporter tests
    test.each(E2E_JSON_REPORTER)(
      'JSON reporter - %s',
      async (
        _title: string,
        args: [test_files_type[], ...string[]],
        filepath: string,
        expectedObj: any
      ) => {
        let [files, ...otherArgs] = args;

        let test_cmd = concat_cmd([
          ...(files.length === 1
            ? [
                '--settings',
                ...prepare_mandatory_args(
                  ...files.map((file) => TEST_FILES[file])
                ),
              ]
            : []),
          // optional args
          ...otherArgs,
          // mandatory args (if needed)
          ...(files.length >= 2
            ? [
                ...prepare_mandatory_args(
                  ...files.map((file) => TEST_FILES[file])
                ),
              ]
            : []),
        ]);

        await parser.parseAsync(test_cmd);

        expect(consoleLog).toHaveBeenCalledWith(
          'Preparing the report file ...'
        );
        expect(consoleLog).toHaveBeenCalledWith(
          'Successfully wrote the report file'
        );

        // check out the file
        let potentialJSON = await fs.promises.readFile(filepath, 'utf-8');
        let result = JSON.parse(potentialJSON);
        // checking the result
        expect(result).toEqual(expectedObj);
      }
    );
  });
});
