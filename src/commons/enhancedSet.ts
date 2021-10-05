// lodash methods
import set from 'lodash/set';

// "Enhance" Lodash set, to deal with custom separator
export default function enhancedSet(
  obj: any,
  key: string,
  val: any,
  keySeparator: string
) {
  // compute path that use dot (or custom) separator + square brack notation
  let path = key
    // handle square brack notation - eg: a[10] should be translated as a.10
    .replace(/\[(\d+)\]/g, `${keySeparator}$1`)
    .split(keySeparator);
  return set(obj, path, val);
}
