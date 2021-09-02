// lodash methodes
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';

// Get all leaves paths of a object
// Typescript code inspired by https://stackoverflow.com/a/55381003/6149867
export default function getLeavesPathes(dataObj: any): string[] {
  const reducer = (aggregator: string[], val: any, key: string) => {
    let paths = [key];
    if (isObject(val)) {
      paths = reduce(val, reducer, []);
      paths = paths.map(path => key + '.' + path);
    }
    aggregator.push(...paths);
    return aggregator;
  };
  const arrayIndexRegEx = /\.(\d+)(?!\w+)/gi;
  let paths = reduce(dataObj, reducer, []);
  paths = paths.map(path => path.replace(arrayIndexRegEx, '[$1]'));

  return paths;
}
