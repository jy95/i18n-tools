// reuse check function from export command
import { FILENAME_CHECK } from './export/index';
// key separator check
import KEYSEPARATOR_CHECK from './commons/keySeparator_check';

// check if at least two paths were provided
// For that, we will use "backupKey" from backupPaths : "paths"
const pathsProp = 'paths';
export const AT_LEAST_2_PATHS_CHECK = async (argv: any) => {
  return Object.values(argv[pathsProp]).filter((v) => v !== undefined).length >=
    2
    ? true
    : new Error('At least two paths must be provided');
};

// export checks in expected order into a single array
export const CHECKS = [
  KEYSEPARATOR_CHECK,
  FILENAME_CHECK,
  AT_LEAST_2_PATHS_CHECK,
];
