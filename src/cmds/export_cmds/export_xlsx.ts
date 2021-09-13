// for fs ops
import path from "path";
import Excel from 'exceljs';
// reuse exceljs Worksheet type
import { Worksheet } from "exceljs";

// common fct
import { merge_i18n_files, setUpCommonsOptions } from "./export_commons";
import { parsePathToJSON, parsePathToFunction } from "../../middlewares/middlewares";

// checks import
import { 
    resolveChecksInOrder, 
    EXPORT_CHECKS
} from "../../checks/index";

// For typing
// eslint-disable-next-line
import type { Argv } from "yargs";
import { XLSXExportArguments, I18N_Merged_Data } from "../../types/exportTypes";

// checks for this command
const CHECKS = [...EXPORT_CHECKS.CHECKS, ...EXPORT_CHECKS.XLSX.CHECKS];

// named exports
export const command = "to_xlsx";
export const description = "Export i18n files into a xlsx file, created by exceljs";

export const builder = function (y : Argv) {
    return setUpCommonsOptions(y) // set up common options for export
        .option("columns", {
            description: "Absolute path to a JSON array of objects, to control the columns. Example : [{ \"locale\": \"FR\", \"label\": \"French translation\" }]",
            demandOption: true
        })
        .option("worksheetName", {
            type: "string",
            description: "Name of the worksheet",
            default: "Translations"
        })
        .option("worksheetCustomizer", {
            description: "Absolute path to a JS module to customize the generated xlsx, thanks to exceljs. This js file exports a default async function with the following signature : (worksheet : Excel.Worksheet) => Promise<Excel.Worksheet>"
        })
        // coerce columns into Object
        .middleware(parsePathToJSON("columns"), true)
        // coerce worksheetCustomizer into function
        .middleware(parsePathToFunction("worksheetCustomizer"), true)
        // validations
        .check(resolveChecksInOrder(CHECKS))
}

export const handler = async function (argv : XLSXExportArguments) {
    try {
        let data : I18N_Merged_Data = await merge_i18n_files(argv);
        const XLSX_FILE = path.resolve(argv.outputDir, argv.filename + ".xlsx");
        await export_as_excel(XLSX_FILE, argv, data);
        console.log(`${XLSX_FILE} successfully written`);
        return Promise.resolve(undefined);
    } catch(/* istanbul ignore next */ err) {
        return Promise.reject(err);
    }
};

// write 
async function export_as_excel(XLSX_FILE : string, argv : XLSXExportArguments, data : I18N_Merged_Data) {

    console.log("Preparing XLSX file ...");

    // prepare data
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(argv.worksheetName);

    // Set up columns
    worksheet.columns = [
        {header: "Technical Key", key: "technical_key"}
    ].concat(
        argv.columns
            .map( ({label, locale}) => ({header: label, key: `labels.${locale}`}) )
    )

    // workaround as Exceljs doesn't support nested key
    worksheet.addRows(
        data.map(item => argv.columns
            .reduce( (acc : { [x: string]: string}, {locale}) => {
                acc[`labels.${locale}`] = item["labels"][locale] || '';
                return acc;
            }, { "technical_key": item["technical_key"] })
        )
    );

    // If worksheetCustomizer was set, give user total control on worksheet output 
    if (argv.worksheetCustomizer) {
        console.log("Applying worksheetCustomizer ...");
        worksheet = await (argv.worksheetCustomizer as (x: Worksheet) => Promise<Worksheet> )(worksheet);
    }
    
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