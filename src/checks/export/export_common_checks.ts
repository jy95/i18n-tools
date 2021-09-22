import fs from 'fs';
import { extname } from 'path';

// lodash methodes
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';

// validation for filename option
export const FILENAME_CHECK = async (argv: any) => {
  let filename: unknown = argv['filename'];
  if (extname(filename as string).length !== 0) {
    return new Error(`${filename} has an extension : Remove it please`);
  } else {
    return true;
  }
};

// validations for files option
export const FILES_CHECK = async (argv: any) => {
  let files = argv.files as any;
  if (!isPlainObject(files)) {
    return new Error('Option files is not a JSON Object');
  }
  if (isEmpty(files)) {
    return new Error('Option files should have at least one entry');
  }
  let entries: [string, any][] = Object.entries(files);
  if (uniq(Object.values(files)).length !== entries.length) {
    return new Error(
      `At least a duplicated value in files JSON object was detected`
    );
  }

  try {
    await Promise.all(entries.map((entry) => verify_files_entry(entry)));
    return true;
  } catch (error) {
    return error as Error;
  }
};

// verify if an entry from files option meet requirements
async function verify_files_entry([_, i18nPath]: [string, any]): Promise<
  boolean | Error
> {
  let potentialJSON;
  // check if file is readable
  try {
    await fs.promises.access(i18nPath);
    potentialJSON = await fs.promises.readFile(i18nPath);
  } catch (error) {
    return Promise.reject(
      new Error(`${i18nPath} cannot be read : check permissions`)
    );
  }
  // check if the file is a JSON
  try {
    JSON.parse(potentialJSON.toString());
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`${i18nPath} isn't a valid JSON`));
  }
}

// validations for resultsFilter option
export const RESULTSFILTER_CHECK = async (argv: any) => {
  if ('resultsFilter' in argv) {
    let fct = argv.resultsFilter as any;
    if (isFunction(fct) && fct.length === 1) {
      return true;
    } else {
      return new Error(
        "resultsFilter is not an function or doesn't take an single argument"
      );
    }
  } else {
    return true;
  }
};

// export checks in expected order into a single array
export const CHECKS = [FILENAME_CHECK, FILES_CHECK, RESULTSFILTER_CHECK];
