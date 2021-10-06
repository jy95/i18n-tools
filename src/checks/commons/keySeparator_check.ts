// lodash methodes
import isString from 'lodash/isString';

const KEYSEPARATOR_CHECK = async (argv: any) => {
  let keySeparator = argv.keySeparator as any;
  let check = [
    () => isString(keySeparator) && keySeparator.length !== 1,
    () => keySeparator === true,
  ].some((pred) => pred());
  if (check) {
    return new Error(`Option keySeparator should be a not-empty char or false`);
  } else {
    return true;
  }
};
export default KEYSEPARATOR_CHECK;
