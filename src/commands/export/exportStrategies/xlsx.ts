import path from "path";
import Excel from 'exceljs';
import { ExportArguments, I18N_Merged_Data } from "../exportTypes";

// TODO turn into aync
exports = module.exports  = (argv : ExportArguments, data : I18N_Merged_Data) => {
    return export_as_excel(argv, data);
}

function export_as_excel(argv : ExportArguments, data : I18N_Merged_Data) {

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

    // finally write this file
    return workbook.xlsx.writeFile(XLSX_FILE);
}