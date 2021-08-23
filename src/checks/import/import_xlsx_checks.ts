// lodash methodes
import isPlainObject from "lodash/isPlainObject";
import has from 'lodash/has';
import find from 'lodash/find';
import isString from "lodash/isString";

// required properties for columns
const REQUIRED_PROPERTIES = ["technical_key", "locales"];

// validation for columns option
export const COLUMNS_CHECK = async (argv: any) => {
    let columns = argv.columns as any;
    if (!isPlainObject(columns)) {
        return new Error('columns is not a JSON Object');
    }
    
    // check presence of required properties
    let missingProp = find(REQUIRED_PROPERTIES, prop => !has(columns, prop));
    if (missingProp) {
        return new Error(`${missingProp} could be found in columns object`)
    }

    // check if locales key is an object
    if (!isPlainObject(columns.locales)) {
        return new Error('locales key in columns object is not a JSON Object');
    }

    // check if locales values all are string
    if (!Object.values(columns.locales).every(v => isString(v))){
        return new Error("At least one value for locales key in columns object isn't a string");
    }
    
    // pass validation
    return true;
}

// export checks in expected order into a single array
export const CHECKS = [COLUMNS_CHECK];