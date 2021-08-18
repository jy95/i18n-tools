import isString from 'lodash/isString';
import fs from 'fs';

// Turn a path into a JSON object
export function parsePathToJSON(prop: string) {
  return async (argv: any) => {
    let filePath = argv[prop] as string;
    if (isString(filePath)) {
      // arg is a Path, convert it into a JSON
      let potentialJSON = await fs.promises.readFile(filePath, 'utf-8');
      let json = JSON.parse(potentialJSON);
      // replace prop by parsed json
      argv[prop] = json;
      return argv;
    } else {
      // don't touch it
      return argv;
    }
  };
}
