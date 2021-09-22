import { writeFile } from 'fs/promises';
import { resolve as pathResolve } from 'path';

// lodash methodes
import set from 'lodash/set';
import groupBy from 'lodash/groupBy';

// For typings
import {
  CommonImportArguments,
  extractedTranslation,
} from '../../types/importTypes';
import CommandBuilder from '../../commons/commandBuilder';

// Builder for yargs
export class CommonImporttYargsBuilder extends CommandBuilder {
  addInputOption() {
    this.y = this.y.options('input', {
      type: 'string',
      describe:
        'Absolute path to a file that will be used as source to generate i18n file(s)',
      demandOption: true,
    });
    return this;
  }

  addOutputDir() {
    this.y = this.y
      .option('outputDir', {
        type: 'string',
        alias: 'od',
        describe: 'Output folder where to store the output file(s)',
        default: process.cwd(),
      })
      // coerce path provided by outputDir
      .coerce(['outputDir'], pathResolve);
    return this;
  }

  addLocalesOption() {
    this.y = this.y.options('locales', {
      type: 'array',
      describe:
        'Array of locales (such as ["FR", "NL"]) that will be used to generate i18n file(s)',
      demandOption: true,
    });
    return this;
  }

  addSuffixOption() {
    this.y = this.y
      .option('suffix', {
        type: 'string',
        describe:
          "Suffix to append in the output filename(s) to distinguish executions of this script. Use an empty string if you don't want this behavior",
      })
      .default('suffix', function () {
        const date = new Date();
        const timestamp = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()} ${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}`;
        return `_${timestamp}`;
      });
    return this;
  }
}

// generate filepaths for locales
export function generate_i18n_filepaths(argv: CommonImportArguments) {
  return argv.locales.reduce((acc: { [x: string]: string }, locale: string) => {
    acc[locale] = pathResolve(
      argv.outputDir,
      `${locale.toLowerCase()}${argv.suffix}.json`
    );
    return acc;
  }, {});
}

// extractedTranslation[] to i18n file(s)
export function extractedTranslations_to_i18n_files(
  files: { [x: string]: string },
  translations: extractedTranslation[]
) {
  let groupBy_locales = groupBy(translations, 'locale');
  return Promise.all(
    Object.entries(groupBy_locales).map(([locale, translations]) =>
      write_new_i18n_file(
        locale,
        files[locale],
        translations_2_i18n_object(translations)
      )
    )
  );
}

// export result for a given language into the given file
function write_new_i18n_file(
  locale: string,
  filepath: string,
  json: { [x: string]: any }
) {
  console.log(`\t Trying to write ${locale} i18n file at ${filepath}`);
  return new Promise((resolve, reject) => {
    writeFile(filepath, JSON.stringify(json, null, 4))
      .then((_) => {
        console.log(`\t Successfully wrote ${locale} i18n file`);
        resolve(undefined);
      })
      .catch((err) => reject(err));
  });
}

// Turns  array for a given lang into a i18n js object
function translations_2_i18n_object(translations: extractedTranslation[]) {
  let result = {};
  translations.forEach((item) => {
    set(result, item['technical_key'], item['label']);
  });
  return result;
}
