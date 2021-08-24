// lodash methodes
import uniq from 'lodash/uniq';

// validation for locales option
export const LOCALES_CHECK = async (argv: any) => {
  const locales = argv.locales as any[];
  /* istanbul ignore if */
  if (uniq(locales).length !== locales.length) {
    return new Error("locales options doesn't contain uniq values");
  }

  // pass validation
  return true;
};

// export checks in expected order into a single array
export const CHECKS = [LOCALES_CHECK];
