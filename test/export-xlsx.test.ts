import os from 'os';
import path from 'path';
import yargs from 'yargs';
// export command
import {
  command,
  description as describeText,
  builder,
} from '../src/cmds/export';
// XLSX description
import { description as xlsx_description } from '../src/cmds/export_cmds/export_xlsx';

// temp folder
const TEMP_FOLDER = os.tmpdir();
// test folders constants
const ROOT_TEST_FOLDER = 'tests-for-export';
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
  },
  array: ['1', '2', '3'].map(item => `${item} ${locale}`),
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
  locales.map(locale => ({
    locale,
    label: locale_label(locale),
  }));

// flat operation
const flat = (arr: any[]) => [].concat(...arr);

// file structure for fsify, in order to run the tests
const structure = [
  {
    type: fsify.DIRECTORY,
    name: ROOT_TEST_FOLDER,
    contents: [
      // In this folder, everything in correct
      {
        type: fsify.DIRECTORY,
        name: VALID_TEST_FOLDER,
        contents: flat([
          // 3 i18n files
          TRANSLATIONS_KEYS.map(locale => ({
            type: fsify.FILE,
            name: `${locale.toLowerCase()}.json`,
            contents: JSON.stringify(generate_i18n(locale)),
          })),
          // the exportColumns.json
          {
            type: fsify.FILE,
            name: 'exportColumns.json',
            contents: JSON.stringify(EXPORT_COLUMNS(TRANSLATIONS_KEYS)),
          },
          // the files.json
          {
            type: fsify.FILE,
            name: 'files.json',
            contents: JSON.stringify(
              generate_files(TRANSLATIONS_KEYS, locale =>
                path.resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${locale.toLowerCase()}.json`
                )
              )
            ),
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
            name: 'emptyObject.json',
            contents: JSON.stringify({}),
          },
          // An empty array
          {
            type: fsify.FILE,
            name: 'emptyArray.json',
            contents: JSON.stringify([]),
          },
          // files.json with duplicated values
          {
            type: fsify.FILE,
            name: 'files-duplicatedValues.json',
            contents: JSON.stringify(
              generate_files(TRANSLATIONS_KEYS, _ =>
                path.resolve(
                  TEMP_FOLDER,
                  ROOT_TEST_FOLDER,
                  VALID_TEST_FOLDER,
                  `${TRANSLATIONS_KEYS[0].toLowerCase()}.json`
                )
              )
            ),
          },
        ],
      },
    ],
  },
];

beforeAll(() => {
  // write temporary files
  //console.log(structure);
  return fsify(structure);
  //return Promise.resolve();
});

// Build the parser used for that command
const parser = yargs.command(command, describeText, builder).help();

// return the output of a given command to the parser
function fetchOutput(cmd: string): Promise<string> {
  return new Promise(resolve => {
    parser.parse(cmd, (_err: Error | undefined, _argv: any, output: string) => {
      resolve(output);
    });
  });
}

describe('[export_xlsx command]', () => {
  describe('Check command availability', () => {
    it('Should list to_xlsx in export command', async () => {
      const output = await fetchOutput('export --help');
      expect(output).toMatch('to_xlsx');
    });

    it('Should display to_xlsx help output', async () => {
      const output = await fetchOutput('export to_xlsx --help');
      expect(output).toMatch(xlsx_description);
    });
  });

  describe('Validations', () => {});
});
