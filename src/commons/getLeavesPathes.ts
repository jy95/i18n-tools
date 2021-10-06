// lodash methodes
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';

// Get all leaves paths of a object
// Typescript code inspired by https://stackoverflow.com/a/55381003/6149867
export default function getLeavesPathes(
  dataObj: any,
  keySeparator: string | false = '.'
): string[] {
  const reducer = (aggregator: string[], val: any, key: string) => {
    let paths = [key];
    if (isObject(val)) {
      paths = reduce(val, reducer, []);
      // In theory, no flatten i18n should arrive here
      // Better prevent that cure, let have a backup scenario
      paths = paths.map((path) => key + (keySeparator || '.') + path);
    }
    aggregator.push(...paths);
    return aggregator;
  };
  let paths = reduce(dataObj, reducer, []);
  if (keySeparator) {
    // Need to double escape stuff when using this constructor
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
    const arrayIndexRegEx = new RegExp(`\\${keySeparator}(\\d+)(?!\\w+)`, 'gi');
    paths = paths.map((path) => path.replace(arrayIndexRegEx, '[$1]'));
  }

  return paths;
}
