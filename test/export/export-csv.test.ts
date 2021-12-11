import path from 'path';
import yargs from 'yargs';
// export command
import {
  command,
  description as describeText,
  builder,
} from '../../src/cmds/export';
// CSV description
import { description as csv_description } from '../../src/cmds/export_cmds/export_csv';

// test helpers
import {
  TEMP_FOLDER,
  VALID_TEST_FOLDER,
  USELESS_TEST_FOLDER,
  expectError,
  fetchOutput,
  fsify_structure,
  fsify,
} from '../test-helpers';

// test folders constants
const ROOT_TEST_FOLDER = 'tests-for-export-csv';

// Translations keys for test
const TRANSLATIONS_KEYS = ['FR', 'NL', 'DE'];
const KEYS_LABEL: { [key: string]: string } = {
  FR: 'French',
  NL: 'Dutch',
  DE: 'German',
};
const locale_label = (locale: string) => `${KEYS_LABEL[locale]} translation`;

// i18n example
const generate_i18n = (locale: string) => ({
  commons: {
    myNestedKey: `Hello world ${locale}`,
    myNestedArray: ['1', '2', '3'].map((item) => `${item} ${locale}`),
  },
  array: ['1', '2', '3'].map((item) => `${item} ${locale}`),
  simpleKey: `[${locale}] not setted key`,
  'Key with spaces': [{ test: '42 is the answer' }],
  'Missing key in DE': locale !== TRANSLATIONS_KEYS[2] ? 'present' : undefined,
});

// Export files
const generate_files = (
  locales: string[],
  fnMapper: (locale: string) => string
) =>
  locales.reduce((acc: { [x: string]: string }, locale: string) => {
    acc[locale] = fnMapper(locale);
    return acc;
  }, {});

// Export columns
const EXPORT_COLUMNS = (locales: string[]) =>
  locales.map((locale) => ({
    locale,
    label: locale_label(locale),
  }));

// flat operation
const flat = (arr: any[]) => [].concat(...arr);

// to access easier the paths of test file paths
const test_files_list = [
  // correct files
  'columns.json',
  'files.json',
  'files-flat.json',
  'settings1.json',
  'settings2.json',
  'settings3.js',
  'settings4.js',
  // wrong files
  'emptyObject.json',
  'emptyArray.json',
  'files-duplicatedValues.json',
  'files-invalidPath.json',
  'columns-missingLabelProp.json',
  'columns-wrongPropValue.json',
  'columns-duplicatedValues.json',
  'columns-missingKey.json',
] as const;
const [
  TEST_FILE_EXPORT_COLUMNS,
  TEST_FILE_FILES,
  TEST_FILE_FLAT_FILES,
  TEST_FILE_SETTINGS1,
  TEST_FILE_SETTINGS2,
  TEST_FILE_SETTINGS3,
  TEST_FILE_SETTINGS4,
  TEST_FILE_EMPTY_OBJECT,
  TEST_FILE_EMPTY_ARRAY,
  TEST_FILE_FILES_DUP,
  TEST_FILE_FILES_INVALID,
  TEST_FILE_EXPORT_COLUMNS_MISS_PROP,
  TEST_FILE_EXPORT_COLUMNS_WRONG_PROP,
  TEST_FILE_EXPORT_COLUMNS_DUP_VALS,
  TEST_FILE_EXPORT_COLUMNS_MISS_KEY,
] = test_files_list;
type test_files_type = typeof test_files_list[number];

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
        contents: flat([
          // 3 i18n files (deep)
          TRANSLATIONS_KEYS.map((locale) => ({
            type: fsify.FILE,
            name: `${locale.toLowerCase()}.json`,
            contents: JSON.stringify(generate_i18n(locale)),
          })),
          // 3 i18n files (flat)
          TRANSLATIONS_KEYS.map((locale) => ({
            type: fsify.FILE,
            name: `${locale.toLowerCase()}-flat.json`,
            contents: JSON.stringify({
              'unchanged.key_with-special-char!': locale,
              'changed.key_test$': locale,
            }),
          })),
          // the columns.json
          {
            type: fsify.FILE,
            name: TEST_FILE_EXPORT_COLUMNS,
            contents: JSON.stringify(EXPORT_COLUMNS(TRANSLATIONS_KEYS)),
          },
          // the files.json
          {
            type: fsify.FILE,
            name: TEST_FILE_FILES,
            contents: JSON.stringify(
              generate_files(TRANSLATIONS_KEYS, (locale) =>
                path.join(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${locale.toLowerCase()}.json`
                )
              )
            ),
          },
          // the files-flat.json
          {
            type: fsify.FILE,
            name: TEST_FILE_FLAT_FILES,
            contents: JSON.stringify(
              generate_files(TRANSLATIONS_KEYS, (locale) =>
                path.join(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${locale.toLowerCase()}-flat.json`
                )
              )
            ),
          },
          // First format of settings.json (Path)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS1,
            contents: JSON.stringify({
              files: path.join(
                TEMP_FOLDER,
                ROOT_TEST_FOLDER,
                VALID_TEST_FOLDER,
                TEST_FILE_FILES
              ),
              columns: path.join(
                TEMP_FOLDER,
                ROOT_TEST_FOLDER,
                VALID_TEST_FOLDER,
                TEST_FILE_EXPORT_COLUMNS
              ),
              filename: 'settings1-output',
              outputDir: TEMP_FOLDER,
            }),
          },
          // Second format of settings.json (Object/Array instead of Paths)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS2,
            contents: JSON.stringify({
              files: generate_files(TRANSLATIONS_KEYS, (locale) =>
                path.join(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${locale.toLowerCase()}.json`
                )
              ),
              columns: EXPORT_COLUMNS(TRANSLATIONS_KEYS),
              filename: 'settings2-output',
              outputDir: TEMP_FOLDER,
            }),
          },
          // First format of settings.js (Mixins config)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS3,
            contents: `module.exports = {
              "files": "${path
                .resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  TEST_FILE_FILES
                )
                .replace(/\\/g, '\\\\')}",
              "columns": "${path
                .resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  TEST_FILE_EXPORT_COLUMNS
                )
                .replace(/\\/g, '\\\\')}",
              "filename": 'settings3-output',
              "resultsFilter": function(data) { return data },
              "outputDir": "${TEMP_FOLDER.replace(/\\/g, '\\\\')}"
            }`,
          },
          // Second format of settings.js (keySeparator)
          {
            type: fsify.FILE,
            name: TEST_FILE_SETTINGS4,
            contents: `module.exports = {
              "files": "${path
                .resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  TEST_FILE_FLAT_FILES
                )
                .replace(/\\/g, '\\\\')}",
              "columns": "${path
                .resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  TEST_FILE_EXPORT_COLUMNS
                )
                .replace(/\\/g, '\\\\')}",
              "filename": 'settings4-output',
              "outputDir": "${TEMP_FOLDER.replace(/\\/g, '\\\\')}",
              "keySeparator": false
            }`,
          },
        ]),
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
          // files.json with duplicated values
          {
            type: fsify.FILE,
            name: TEST_FILE_FILES_DUP,
            contents: JSON.stringify(
              generate_files(TRANSLATIONS_KEYS, (_) =>
                path.join(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${TRANSLATIONS_KEYS[0].toLowerCase()}.json`
                )
              )
            ),
          },
          // files.json with invalid path
          {
            type: fsify.FILE,
            name: TEST_FILE_FILES_INVALID,
            contents: JSON.stringify({
              fr: '/not/a/valid/path/fr.json',
            }),
          },
          // columns.json with missing property (label)
          {
            type: fsify.FILE,
            name: TEST_FILE_EXPORT_COLUMNS_MISS_PROP,
            contents: JSON.stringify([{ locale: 'FR' }]),
          },
          // columns.json with wrong property type
          {
            type: fsify.FILE,
            name: TEST_FILE_EXPORT_COLUMNS_WRONG_PROP,
            contents: JSON.stringify([{ locale: 'FR', label: 42 }]),
          },
          // columns.json with duplicated value
          {
            type: fsify.FILE,
            name: TEST_FILE_EXPORT_COLUMNS_DUP_VALS,
            contents: JSON.stringify([
              { locale: 'FR', label: 'Hello World' },
              { locale: 'NL', label: 'Hello World' },
            ]),
          },
          // columns.json with missing key for files.json
          {
            type: fsify.FILE,
            name: TEST_FILE_EXPORT_COLUMNS_MISS_KEY,
            contents: JSON.stringify([
              { locale: 'FR', label: 'French translation' },
            ]),
          },
        ],
      },
    ],
  },
];

// files path
const TEST_FILES: { [x in test_files_type]: string } = test_files_list.reduce(
  (acc: any, curr: test_files_type, idx: number) => {
    // improvement for later : handle generically nested stuff
    let arr = [
      TEMP_FOLDER,
      ROOT_TEST_FOLDER,
      idx < 7 ? VALID_TEST_FOLDER : USELESS_TEST_FOLDER,
      curr,
    ];
    acc[curr] = path.join(...arr);
    return acc;
  },
  {}
);

beforeAll(() => {
  // write temporary files
  return fsify(structure);
});

// Build the parser used for that command
const parser = yargs.command(command, describeText, builder).help();

// to concat faster command
type concat_cmd_type = (args: string[]) => string;
type prepare_mandatory_args_type = (...args: string[]) => string[];
const concat_cmd: concat_cmd_type = (args: string[]) =>
  `export to_csv ${args.join(' ')}`;
const prepare_mandatory_args: prepare_mandatory_args_type = (
  ...args: string[]
) => ['--files', `"${args[0]}"`, '--columns', `"${args[1]}"`];

// test scenarios for validations
const VALIDATIONS_SCENARIOS: [string, string[], ...string[]][] = [
  [
    // Test out the message : "Error: test.csv has an extension : Remove it please"
    'Filename with extension should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EXPORT_COLUMNS, '--filename', `"test.csv"`],
    'test.csv',
    'extension',
  ],
  [
    // Test out the message : "Option keySeparator should be a not-empty char"
    'Option keySeparator - Invalid separator should be rejected',
    [
      TEST_FILE_FILES,
      TEST_FILE_EXPORT_COLUMNS,
      '--keySeparator',
      `"HACKERMAN"`,
    ],
    'keySeparator',
    'not-empty char',
  ],
  [
    // Test out the message : "Option files is not a JSON Object"
    'Option files - unexpected file should be rejected',
    [TEST_FILE_EMPTY_ARRAY, TEST_FILE_EXPORT_COLUMNS],
    'not a JSON Object',
  ],
  [
    // Test out the message : "Option files should have at least one entry"
    'Option files - empty object should be rejected',
    [TEST_FILE_EMPTY_OBJECT, TEST_FILE_EXPORT_COLUMNS],
    'at least one entry',
  ],
  [
    // Test out the message : "At least a duplicated value in files JSON object was detected"
    'Option files - Duplicated values should be rejected',
    [TEST_FILE_FILES_DUP, TEST_FILE_EXPORT_COLUMNS],
    'duplicated value',
  ],
  [
    // Test out the message : `${i18nPath} cannot be read : check permissions`
    'Option files - invalid path(s) should be rejected',
    [TEST_FILE_FILES_INVALID, TEST_FILE_EXPORT_COLUMNS],
    'cannot be read',
  ],
  [
    // Test out the message : "columns is not a JSON Array"
    'Option columns - unexpected file should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EMPTY_OBJECT],
    'not a JSON Array',
  ],
  [
    // Test out the message : "Option columns should have at least one entry"
    'Option columns - empty array should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EMPTY_ARRAY],
    'at least one entry',
  ],
  [
    // Test out the message : `At least one item in columns array doesn't have "${prop}" property`
    'Option columns - missing property in array should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EXPORT_COLUMNS_MISS_PROP],
    "doesn't have",
    'property',
  ],
  [
    // Test out the message : `At least one item in columns array doesn't have "${prop}" property with a String value`
    'Option columns - unexpected property type should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EXPORT_COLUMNS_WRONG_PROP],
    "doesn't have",
    'property with a String value',
  ],
  [
    // Test out the message : `At least a duplicated value in columns array in prop "${prop}" was detected`
    'Option columns - duplicated value should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EXPORT_COLUMNS_DUP_VALS],
    'duplicated value',
  ],
  [
    // Test out the message : 'At least one key differs between files and columns options'
    'Options files & columns - incompatibles files should be rejected',
    [TEST_FILE_FILES, TEST_FILE_EXPORT_COLUMNS_MISS_KEY],
    'between files and columns',
  ],
];

describe('[export_csv command]', () => {
  describe('Check command availability', () => {
    it('Should list to_csv in export command', async () => {
      const output = await fetchOutput(parser)('export --help');
      expect(output).toMatch('to_csv');
    });

    it('Should display to_csv help output', async () => {
      const output = await fetchOutput(parser)('export to_csv --help');
      expect(output).toMatch(csv_description);
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
      async (_title: string, args: string[], ...messages: string[]) => {
        let [files, columns, ...otherArgs] = args;
        let test_cmd = concat_cmd([
          // mandatory args
          ...prepare_mandatory_args(
            TEST_FILES[files as test_files_type],
            TEST_FILES[columns as test_files_type]
          ),
          // optional args
          ...otherArgs,
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

    test.each([
      ['settings.json (Paths)', TEST_FILE_SETTINGS1],
      ['settings.json (Object/Array instead of Paths)', TEST_FILE_SETTINGS2],
      ['settings.js (Include resultsFilter as fct)', TEST_FILE_SETTINGS3],
      ['settings.js (keySeparator set to false)', TEST_FILE_SETTINGS4],
    ])('%s', async (_title: string, settingsFile: test_files_type) => {
      let test_cmd = concat_cmd([
        '--settings',
        `"${TEST_FILES[settingsFile]}"`,
      ]);
      // example : 'settings1-output'
      let filename = settingsFile.substring(0, settingsFile.lastIndexOf('.'));
      let expectedFile = path.join(TEMP_FOLDER, `${filename}-output.csv`);

      // run command
      //console.warn(test_cmd);
      await parser.parseAsync(test_cmd);

      expect(consoleLog).toHaveBeenCalledWith('Preparing CSV file ...');
      expect(consoleLog).toHaveBeenCalledWith(
        `${expectedFile} successfully written`
      );
    });
  });
});
