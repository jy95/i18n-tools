// I keep in comments the stuff needed to convert that into a TS file
// (So I can easily update this script in the future)
//import { Worksheet } from "exceljs";

module.exports = async function(worksheet /*: Worksheet*/) {
    // Conditionaly formatting (to better view stuff)
    let rowCount = worksheet.rowCount;
    let columnCount = worksheet.columnCount;

    // for easiness in the future, for arbitrary number of translations
    // As table have a least one language (starting to 'B'), pretty simple to compute last column letter 
    let lastColumnLetter = String.fromCharCode(66 + (columnCount - 2));

    // domain for rules ; All the cells
    // Ex : "B2:D" + rowCount + 2" for three languages
    let computedRef = `B2:${ lastColumnLetter + rowCount + 2}`;

    worksheet.addConditionalFormatting({
        ref: computedRef,
        rules: [
            // cell is empty : put it in red 
            {
                type: 'containsText',
                operator: "containsBlanks",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF5733'}}},
                priority: 1
            },
            // cell contains either [FR], [NL] or [DE] : put it in orange
            {
                type: "containsText",
                operator: "containsText",
                text: "[FR]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}},
                priority: 2
            },
            {
                type: "containsText",
                operator: "containsText",
                text: "[NL]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}},
                priority: 2
            },
            {
                type: "containsText",
                operator: "containsText",
                text: "[DE]",
                style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FF9633'}}},
                priority: 2
            }          
        ]
    });

    return worksheet;
}