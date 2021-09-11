import Excel from 'exceljs';

// common fct
import { setUpCommonsOptions, generate_i18n_filepaths, extractedTranslations_to_i18n_files } from "./import_commons";
import { parsePathToJSON } from "../../middlewares/middlewares";

// lodash methods
import flattenDeep from "lodash/flattenDeep";

// checks import
import { 
    resolveChecksInOrder,
    IMPORT_CHECKS
} from "../../checks/index";

// For typing
// eslint-disable-next-line
import type { Argv } from "yargs";
import { CSVImportArguments } from "../../types/importTypes";

// checks for this command
const CHECKS = [...IMPORT_CHECKS.CHECKS, ...IMPORT_CHECKS.CSV.CHECKS];

// named exports
export const command = "from_csv";
export const description = "Turn a csv file to i18n file(s)";

export const builder = function (y : Argv) {
    return setUpCommonsOptions(y) // set up common options for import
        .options("columns", {
            describe: "Absolute path to a JSON object that describe headers of the excel columns used to store translations",
            demandOption: true
        })
        .option('delimiter', {
            description: 'Specify an field delimiter such as | or \\t',
            choices: [',', ';', '\t', ' ', '|'],
            default: ';',
        })
        .option('quote', {
            description: 'String used to quote fields that contain a delimiter',
            type: 'string',
            default: '"',
          })
        .option('escape', {
            description:
                'The character used when escaping a value that is quoted and contains a quote character that is not the end of the field',
            type: 'string',
            default: '"',
        })
        .option('encoding', {
            description: "Input file encoding",
            choices: ['utf8', 'utf16le', 'latin1'],
            default: 'utf8'
        })
        // coerce columns into Object
        .middleware(parsePathToJSON("columns"), true)
        // validations
        .check(resolveChecksInOrder(CHECKS))
}

export const handler = async function (argv : CSVImportArguments) {
    try {
        const translations = await csv_2_translation_objects(argv);
        const files = generate_i18n_filepaths(argv);
        await extractedTranslations_to_i18n_files(files, translations);
        console.log("Successfully exported found locale(s) to i18n json file(s)");
        return Promise.resolve(undefined);
    } catch (error) {
        return Promise.reject(error);
    }
}

// Extract translations from csv file
async function csv_2_translation_objects(argv : CSVImportArguments) {
    const options = {
        // https://c2fo.io/fast-csv/docs/parsing/options
        parserOptions: {
            headers: true, // needed for algorithm
            delimiter: argv.delimiter,
            quote: argv.quote,
            escape: argv.escape,
            encoding: argv.encoding
        }
    };
    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(argv.input, options);
    let rowCount = worksheet.rowCount;
    
    // columns properties to load
    let columns = argv.columns;

    // retrieve the headers of the table
    // Warning : Exceljs put for some reason a undefined value at the 0 index
    let headers = worksheet.getRow(1).values as (undefined | string)[];
    // retrieve data of the table
    let data = (worksheet.getRows(2, rowCount-1) || /* istanbul ignore next */ []).map(item => item.values);

    // find out where the technical key is
    const technical_key_index = headers.findIndex(h => (h || '').includes(columns.technical_key));

    if (technical_key_index === -1) {
        return Promise.reject(new Error("Couldn't find index for technical_key with provided label"));
    }

    // find out where the translations are positioned in the value
    const locales_index = Object
        .entries(columns.locales)
        .map( ([key, value]) => ({ [key]: headers.findIndex(h => (h || '').includes(value)) }))
        .reduce( (prev, curr) => Object.assign(prev, curr), {})
    
    // Warn users if some locale translations couldn't be found
    let missing_indexes = Object
        .entries(locales_index)
        .filter( ([_, idx]) => idx === -1);

    for(let [locale, ] of missing_indexes) {
        /* istanbul ignore next Not worthy to create a test case for that*/
        console.warn(`Couldn't find index for ${locale} locale with provided label`)
    }    

    // build results
    let results = data.map(
        (row : any) => Object
            .entries(locales_index)
            // skip translation(s) where index couldn't be found
            .filter( ([_, idx]) => idx !== -1)
            .map( ([locale, localeIndex]) => ({
                "technical_key": row[technical_key_index],
                "label": row[localeIndex],
                "locale": locale
            }))
    )
    return Promise.resolve(flattenDeep(results));
}

// default export
export default {
    command : command,
    description: description,
    builder : builder,
    handler: handler
}