// for fs ops
import path from "path";
import Excel from 'exceljs';

// lodash modules
import isString from "lodash/isString";
import isArray from "lodash/isArray";
import some from "lodash/some";
import has from "lodash/has";
import get from "lodash/get";
import uniq from "lodash/uniq";
import find from "lodash/find";
import difference from "lodash/difference";

// common fct
import { merge_i18n_files, setUpCommonsOptions } from "./export_commons";
import { parsePathToJSON } from "../../middlewares/middlewares";

// For typing
// eslint-disable-next-line
import type { Argv } from "yargs";
import { XLSXExportArguments, I18N_Merged_Data } from "../../types/exportTypes";

// named exports
export const command = "to_xlsx";
export const description = "Export i18n files into a xlsx file, created by exceljs";

export const builder = function (y : Argv) {
    return setUpCommonsOptions(y) // set up common options for export
        .option("exportColumns", {
            description: "Path to a JSON array of objects, to control the export columns. Example : [{ \"locale\": \"FR\", \"label\": \"French translation\" }]",
            demandOption: true
        })
        .option("worksheetName", {
            type: "string",
            description: "Name of the worksheet",
            default: "Translations"
        })
        .option("worksheetCustomizer", {
            type: "string",
            description: "Path to a JS module to customize the generated xlsx, thanks to exceljs. This js file exports a default function with the following signature : (worksheet : Excel.Worksheet, numberOfRows : number) : "
        })
        // coerce exportColumns into Object
        .middleware(parsePathToJSON("exportColumns"), true)
        // validations for exportColumns option
        .check( async (argv) => {
            let exportColumns = await argv.exportColumns as any;
            if (!isArray(exportColumns)) {
                return new Error("exportColumns is not a JSON Array");
            }
            if (exportColumns.length === 0) {
                return new Error("Option exportColumns should have at least one entry");
            }
            // checking rules
            let errors_detectors : {
                message: (prop : string) => string,
                errorDetected: (prop : string) => boolean
            }[] = [
                {
                    message: (prop : string) => `At least one item in exportColumns array doesn't have "${prop}" property`,
                    errorDetected: (prop : string) => some(exportColumns, (item) => !has(item, prop) )
                },
                {
                    message: (prop : string) => `At least one item in exportColumns array doesn't have "${prop}" property with a String value`,
                    errorDetected: (prop : string) => some(exportColumns, (item) => !isString(get(item, prop)) )
                },
                {
                    message: (prop : string) => `At least a duplicated value in exportColumns array in prop "${prop}" was detected`,
                    errorDetected: (prop : string) => uniq(exportColumns.map( (item : string) => get(item, prop))).length !== exportColumns.length
                }
            ];
            // run check
            return ["locale", "label"].reduce( (acc : boolean | Error, prop : string) => {
                if (acc !== true) {
                    return acc;
                } else {
                    let error = find(errors_detectors, (rule) => rule.errorDetected(prop))
                    if (error) {
                        return new Error(error.message(prop));
                    } else {
                        return acc;
                    }
                }
            }, true);
        })
        // validation for both exportColumns & files options
        .check( async (argv) => {
            let exportColumns = await argv.exportColumns as any;
            let files = await argv.files as any;

            let keys_exportColumns : string[] = exportColumns.map( (x : object) => get(x, "locale"));
            let keys_files : string[] = Object.keys(files);
            if (difference(keys_exportColumns, keys_files).length !== 0) {
                return new Error('At least one key differs between files and exportColumns options');
            } else {
                return true;
            }
        });
}

export const handler = async function (argv : XLSXExportArguments) {
    try {
        let data : I18N_Merged_Data = await merge_i18n_files(argv);
        await export_as_excel(argv, data);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

// write 
function export_as_excel(argv : XLSXExportArguments, data : I18N_Merged_Data) {

    const XLSX_FILE = path.resolve(argv.outputDir, argv.filename + ".xlsx");
    console.log("Trying to write " + XLSX_FILE);

    // prepare data
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(argv.worksheetName);

    // Set up columns
    worksheet.columns = [
        {header: "Technical Key", key: "technical_key"}
    ].concat(
        argv.exportColumns
            .map( ({label, locale}) => ({header: label, key: `labels.${locale}`}) )
    )

    // workaround as Exceljs doesn't support nested key
    worksheet.addRows(
        data.map(item => argv.exportColumns
            .reduce( (acc : { [x: string]: string}, {locale}) => {
                acc[`labels.${locale}`] = item["labels"][locale] || '';
                return acc;
            }, { "technical_key": item["technical_key"] })
        )
    )
    
    // TODO move that part into a separate file
    // Conditionaly formatting (to better view view stuff)
    /*
    worksheet.addConditionalFormatting({
        ref: "B2:D" + data.length + 2,
        rules: [
            // cell is empty : put it in red 
            {
                type: 'containsText',
                operator: "containsBlanks",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF5733'}}},
            },
            // cell contains either [FR], [NL] or [DE] : put it in orange
            {
                type: "containsText",
                operator: "containsText",
                text: "[FR]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}}
            },
            {
                type: "containsText",
                operator: "containsText",
                text: "[NL]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}}
            },
            {
                type: "containsText",
                operator: "containsText",
                text: "[DE]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}}
            }          
        ]
    });
    */

    // finally write this file
    return workbook.xlsx.writeFile(XLSX_FILE);
}

// default export
export default {
    command : command,
    description : description,
    builder : builder,
    handler: handler
}