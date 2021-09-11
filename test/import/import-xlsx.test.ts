import os from 'os';
import path from 'path';
import yargs from 'yargs';
// import command
import {
  command,
  description as describeText,
  builder,
} from '../../src/cmds/import';
// XLSX description
import { description as xlsx_description } from '../../src/cmds/import_cmds/import_xlsx';

// temp folder
const TEMP_FOLDER = os.tmpdir();
// test folders constants
const ROOT_TEST_FOLDER = 'tests-for-import-xlsx';
const [VALID_TEST_FOLDER, USELESS_TEST_FOLDER] = [
    'correct', // folder where every file are correct
    'useless', // folder where file has an useless content
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
const parser = yargs.command(command, describeText, builder).help();

// to concat faster command
type concat_cmd_type = (args: string[]) => string;
type prepare_mandatory_args_type = (...args: [string, string, string[]]) => string[];
const concat_cmd: concat_cmd_type = (args: string[]) =>
  `import from_xlsx ${args.join(' ')}`;
const prepare_mandatory_args: prepare_mandatory_args_type = (
  ...[input, columns, ...locales]
) => ['--input', `"${input}"`, '--columns', `"${columns}"`, '--locales', locales.join(' ')];

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

// to access easier the paths of test file paths
const test_files_list = [
    // inpput file
    'export-xlsx.xlsx',
    // correct files
    'columns.json',
    'settings1.json',
    'settings2.json',
    // wrong files
    'emptyObject.json',
    'emptyArray.json',
    // wrong columns.json
    'columns-technicalKeyNotString.json',
    'columns-localesNotAObject.json',
    'columns-localesValuesNotString.json'
] as const;
const [
    TEST_FILE_INPUT,
    TEST_FILE_COLUMNS,
    TEST_FILE_SETTINGS1,
    TEST_FILE_SETTINGS2,
    TEST_FILE_EMPTY_OBJECT,
    TEST_FILE_EMPTY_ARRAY,
    TEST_FILE_COLUMNS_TKNS,
    TEST_FILE_COLUMNS_LNAO,
    TEST_FILE_COLUMNS_LVNS
] = test_files_list;
type test_files_type = typeof test_files_list[number];

// files path
const TEST_FILES: { [x in test_files_type]: string } = test_files_list.reduce(
    (acc: any, curr: test_files_type, idx: number) => {
        let arr = 
            (idx === 0) 
                ? [
                    __dirname,
                    "..",
                    "fixtures",
                    "import-xlsx",
                    curr,
                ]
                : [
                    TEMP_FOLDER,
                    ROOT_TEST_FOLDER,
                    (idx > 0 && idx < 4) ? VALID_TEST_FOLDER : USELESS_TEST_FOLDER,
                    curr,
                ]
            ;
        acc[curr] = path.resolve(...arr);
        return acc;
    },
    {}
);

// test scenarios for validations
const VALIDATIONS_SCENARIOS : [
    string,
    [test_files_type, test_files_type, string[], ...string[]],
    ...string[]
][] = [
    [
      // Test out the message : "locales options doesn't contain uniq values"
      'Option locales - Duplicated values should be rejected',
      [TEST_FILE_INPUT, TEST_FILE_COLUMNS, ["FR", "FR"]],
      // I have to disable the error message check as yargs is buggy atm
      //"doesn't contain uniq values"
    ],
    [
      // Test out the message : 'columns is not a JSON Object'
      'Option columns - unexpected file should be rejected',
      [TEST_FILE_INPUT, TEST_FILE_EMPTY_ARRAY, ["FR", "NL"]],
      "columns is not a JSON Object"
    ],
    [
      // Test out the message : `${missingProp} couldn't be found in columns object`
      'Option columns - missing property should be rejected',
      [TEST_FILE_INPUT, TEST_FILE_EMPTY_OBJECT, ["FR", "NL"]],
      "couldn't be found in columns object"
    ],
    [
      // Test out the message : "technical_key in columns object isn't a String"
      'Option columns - unexpected technical_key value should be reject',
      [TEST_FILE_INPUT, TEST_FILE_COLUMNS_TKNS, ["FR", "NL"]],
      "technical_key in columns object isn't a String"
    ],
    [
      // Test out the message : "locales key in columns object is not a JSON Object",
      'Option columns - unexpected locales value should be rejected',
      [TEST_FILE_INPUT, TEST_FILE_COLUMNS_LNAO, ["FR", "NL"]],
      "locales key in columns object is not a JSON Object"
    ],
    [
      // Test out the message : "At least one value for locales key in columns object isn't a string"
      'Option columns - unexpected value(s) for locales should be rejected',
      [TEST_FILE_INPUT, TEST_FILE_COLUMNS_LVNS, ["FR", "NL"]]
    ]
];

// file structure for fsify, in order to run the tests
// type for fsify structure
type fsify_structure = {
  type: any;
  name: string;
  contents: string | fsify_structure;
}[];

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
          // columns file
          {
            type: fsify.FILE,
            name: TEST_FILE_COLUMNS,
            contents: JSON.stringify({
              technical_key: "Technical Key",
              locales: {
                "FR": "French translation",
                "NL": "Dutch translation",
                "DE": "German translation"
              }
            })
          },
          // First format of settings.json (Path)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS1,
            contents: JSON.stringify({
              input: TEST_FILES[TEST_FILE_INPUT],
              columns: TEST_FILES[TEST_FILE_COLUMNS],
              locales: ["FR", "NL", "DE"],
              outputDir: path.resolve(TEMP_FOLDER, ROOT_TEST_FOLDER),
              suffix: "_settings1"
            })
          },
          // Second format of settings.json (Object/Array instead of Paths)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS2,
            contents: JSON.stringify({
              input: TEST_FILES[TEST_FILE_INPUT],
              columns: {
                technical_key: "Technical Key",
                locales: {
                  "FR": "French translation",
                  "NL": "Dutch translation",
                  "DE": "German translation"
                }
              },
              locales: ["FR", "NL", "DE"],
              outputDir: path.resolve(TEMP_FOLDER, ROOT_TEST_FOLDER),
              suffix: "_settings2"
            })
          },
        ]
      },
      // In this folder, files used for validations
      {
        type: fsify.DIRECTORY,
        name: USELESS_TEST_FOLDER,
        contents: [
          // An empty object
          {
            type: fsify.FILE,
            name: TEST_FILE_EMPTY_OBJECT,
            contents: JSON.stringify({}),
          },
          // An empty array
          {
            type: fsify.FILE,
            name: TEST_FILE_EMPTY_ARRAY,
            contents: JSON.stringify([]),
          },
          // columns option - technical_key not a string
          {
            type: fsify.FILE,
            name: TEST_FILE_COLUMNS_TKNS,
            contents: JSON.stringify({
              technical_key: 42.0,
              locales: {}
            })
          },          
          // columns option - locales not a object
          {
            type: fsify.FILE,
            name: TEST_FILE_COLUMNS_LNAO,
            contents: JSON.stringify({
              technical_key: "something",
              locales: []
            })
          },
          // columns option - locales values not string
          {
            type: fsify.FILE,
            name: TEST_FILE_COLUMNS_LVNS,
            contents: JSON.stringify({
              technical_key: "something",
              locales: {
                "FR": 42.0,
                "NL": null
              }
            })
          },
        ]
      }
    ]
  }
];

beforeAll(() => {
  // write temporary files
  return fsify(structure);
});

describe('[import_xlsx command]', () => {

    describe('Check command availability', () => {
        it('Should list from_xlsx in import command', async () => {
          const output = await fetchOutput('import --help');
          expect(output).toMatch('from_xlsx');
        });
    
        it('Should display from_xlsx help output', async () => {
          const output = await fetchOutput('import from_xlsx --help');
          expect(output).toMatch(xlsx_description);
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
    
        test.each(VALIDATIONS_SCENARIOS)('%s', async (_title: string, args: [test_files_type, test_files_type, string[], ...string[]], ...messages: string[]) => {
          let [input, columns, locales, ...otherArgs] = args;
          let test_cmd = concat_cmd([
            // mandatory args
            ...prepare_mandatory_args(
              TEST_FILES[input],
              TEST_FILES[columns],
              locales
            ),
            // optional args
            ...otherArgs,
          ]);
          //console.warn(test_cmd);
          // Test out if error message is thrown
          await expectError(test_cmd, ...messages);
        });
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
    
        test.each([
          ['(Paths)', TEST_FILE_SETTINGS1],
          ['(Object/Array instead of Paths)', TEST_FILE_SETTINGS2],
        ])(
          'settings.json %s',
          async (_title: string, settingsFile: test_files_type) => {
            let test_cmd = concat_cmd([
              '--settings',
              `"${TEST_FILES[settingsFile]}"`,
            ]);
            // run command
            //console.warn(test_cmd);
            await parser.parseAsync(test_cmd);
    
            expect(consoleLog).toHaveBeenCalledWith('Successfully exported found locale(s) to i18n json file(s)');
          }
        );
      });
});