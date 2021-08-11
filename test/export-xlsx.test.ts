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
const [VALID_TEST_FOLDER, EMPTY_TEST_FOLDER] = [
  'correct', // folder where every file are correct
  'empty', // folder where file has an useless content ([])
];

// initialise fsify
const fsify : {
  [x: string] : any,
  DIRECTORY: any,
  FILE: any,
  (_ : { [x: string] : any }) : Promise<any>
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
      // In this folder, everything in order
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
              TRANSLATIONS_KEYS.reduce(
                (acc: { [x: string]: string }, locale: string) => {
                  acc[locale] = path.resolve(
                    TEMP_FOLDER,
                    ROOT_TEST_FOLDER,
                    VALID_TEST_FOLDER,
                    `${locale.toLowerCase()}.json`
                  );
                  return acc;
                },
                {}
              )
            ),
          },
        ]),
      },
    ],
  },
];

beforeAll(() => {
  // useless
  console.log(EMPTY_TEST_FOLDER);
  // write temporary files
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

describe('[export_xlsx command] - tests', () => {
  it('Should list to_xlsx in export command', async () => {
    const output = await fetchOutput('export --help');
    expect(output).toBe(expect.stringContaining('to_xlsx'));
  });

  it('Should display to_xlsx help output', async () => {
    const output = await fetchOutput('export to_xlsx --help');
    expect(output).toBe(expect.stringContaining(xlsx_description));
  });

  /*
    it("Should parse correctly when conditions are meet", () => {
        parser.parse()
    });
    */
});
