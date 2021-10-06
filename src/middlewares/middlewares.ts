import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import fs from 'fs';

// internal function for both parsePath(s)toJSON middlewares
// could be improved later to handle URL too
async function path2JSON(file: string | any) {
  if (isString(file)) {
    // arg is a Path, convert it into a JSON
    let potentialJSON = await fs.promises.readFile(file, 'utf-8');
    return JSON.parse(potentialJSON);
  } else {
    // don't touch it
    return file;
  }
}

// Turn a path into a JSON object
export function parsePathToJSON(prop: string) {
  return async (argv: any) => {
    let file = argv[prop] as string | any;
    let potentialJSON = await path2JSON(file);
    // reference check : if something changed, update argv
    if (potentialJSON !== file) {
      // replace prop by parsed json
      argv[prop] = potentialJSON;
    }
    return argv;
  };
}

// Turn variadic paths into each a JSON object
export function parsePathsToJSON(prop: string) {
  return async (argv: any) => {
    let paths = (argv[prop] || []) as (string | any)[];
    let results: any[] = [];
    for (let file of paths) {
      let potentialJSON = await path2JSON(file);
      results.push(
        potentialJSON !== file ? potentialJSON : /* istanbul ignore next */ file
      );
    }
    argv[prop] = results;
    return argv;
  };
}

// Backup path(s) provided by user
// If a path couldn't be found (because it was provided directly as object / array in settings)
// Default value "undefined" will be used
export function backupPaths(prop: string, backupKey: string) {
  return (argv: any) => {
    let data = argv[prop] as any | any[];
    argv[backupKey] = (isArray(data) ? data : [data]).reduce(
      (acc, curr, idx) => {
        acc[`file${idx + 1}`] = isString(curr) ? curr : undefined;
        return acc;
      },
      {}
    );
    return argv;
  };
}

// Turn path into function
export function parsePathToFunction(prop: string) {
  return async (argv: any) => {
    let param = argv[prop] as string | ((x: any) => any) | undefined;
    if (param) {
      argv[prop] = isString(param) ? require(param) : param;
    }
    return argv;
  };
}

// Turn unknown into false, if possible
export function parseUnknownToFalse(prop: string) {
  return async (argv: any) => {
    let param = argv[prop] as unknown;
    let check = ['false', false].some((pred) => pred === param);
    if (check) {
      argv[prop] = false;
    }
    return argv;
  };
}
