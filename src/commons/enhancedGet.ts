// lodash methods
import get from 'lodash/get';

// "Enhance" Lodash get, to deal with custom separator
export default function enhancedGet(
  obj: any,
  key: string,
  keySeparator: string
) {
  // compute path that use dot (or custom) separator + square brack notation
  let path = key
    // handle square brack notation - eg: a[10] should be translated as a.10
    .replace(/\[(\d+)\]/g, `${keySeparator}$1`)
    .split(keySeparator);
  return get(obj, path);
}
