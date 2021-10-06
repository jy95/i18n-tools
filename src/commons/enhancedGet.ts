// lodash methods
import get from 'lodash/get';

// "Enhance" Lodash get, to deal with custom separator
export default function enhancedGet(
  obj: any,
  key: string,
  keySeparator: string | false
) {
  // compute path that use dot (or custom) separator + square brack notation
  let path = keySeparator
    ? key
        // handle square brack notation - eg: a[10] should be translated as a.10
        .replace(/\[(\d+)\]/g, `${keySeparator}$1`)
        .split(keySeparator)
    : [key];
  return get(obj, path);
}
