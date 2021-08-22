// lodash methodes
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import has from 'lodash/has';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import find from 'lodash/find';
import xor from 'lodash/xor';

// validations for columns option
export const COLUMNS_CHECK = async (argv: any) => {
  let columns = argv.columns as any;
  if (!isArray(columns)) {
    return new Error('columns is not a JSON Array');
  }
  if (isEmpty(columns)) {
    return new Error('Option columns should have at least one entry');
  }
  // checking rules
  let errors_detectors: {
    message: (prop: string) => string;
    errorDetected: (prop: string) => boolean;
  }[] = [
    {
      message: (prop: string) =>
        `At least one item in columns array doesn't have "${prop}" property`,
      errorDetected: (prop: string) => some(columns, item => !has(item, prop)),
    },
    {
      message: (prop: string) =>
        `At least one item in columns array doesn't have "${prop}" property with a String value`,
      errorDetected: (prop: string) =>
        some(columns, item => !isString(get(item, prop))),
    },
    {
      message: (prop: string) =>
        `At least a duplicated value in columns array in prop "${prop}" was detected`,
      errorDetected: (prop: string) =>
        uniq(columns.map((item: string) => get(item, prop))).length !==
        columns.length,
    },
  ];
  // run check
  return ['locale', 'label'].reduce((acc: boolean | Error, prop: string) => {
    /* istanbul ignore if */
    if (acc instanceof Error) {
      return acc;
    } else {
      let error = find(errors_detectors, rule => rule.errorDetected(prop));
      if (error) {
        return new Error(error.message(prop));
      } else {
        return acc;
      }
    }
  }, true);
};

// validation for both columns & files options
export const COLUMNS_AND_FILES_CHECK = async (argv: any) => {
  let columns = argv.columns as any[];
  let files = argv.files as { [x: string]: any };

  let keys_columns: string[] = columns.map((x: { [x: string]: any }) =>
    get(x, 'locale')
  );
  let keys_files: string[] = Object.keys(files);
  if (isEmpty(xor(keys_columns, keys_files))) {
    return true;
  } else {
    return new Error(
      'At least one key differs between files and columns options'
    );
  }
};

// export checks in expected order into a single array
export const CHECKS = [COLUMNS_CHECK, COLUMNS_AND_FILES_CHECK];
