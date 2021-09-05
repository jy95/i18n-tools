---
sidebar_position: 1
sidebar_label: export to_xlsx
---

# export to_xlsx

> Export i18n files into a xlsx file, created by exceljs

## Command

```bash
# Display help for export to_xlsx
npx @jy95/i18n-tools export to_xlsx --help
```

## Examples

### First format of settings.json (Path)

```json title="files.json"
{
    "FR":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\fr.json",
    "NL":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\nl.json",
    "DE":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\de.json"
}
```

```json title="columns.json"
[
    {
        "locale":"FR",
        "label":"French translation"
    },
    {
        "locale":"NL",
        "label":"Dutch translation"
    },
    {
        "locale":"DE",
        "label":"German translation"
    }
]
```

```json title="settings1.json"
{
   "files":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\files.json",
   "columns":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\columns.json",
   "worksheetName":"Settings 1 - Worksheet",
   "filename":"settings1-output",
   "outputDir":"D:\\TEMP\\TEMP"
}
```

```bash
npx @jy95/i18n-tools export to_xlsx --settings "/absolutePath/to/settings1.json"
```

### Second format of settings.json (Object/Array instead of Paths)

```json title="settings2.json"
{
   "files":{
      "FR":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\fr.json",
      "NL":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\nl.json",
      "DE":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\de.json"
   },
   "columns":[
      {
         "locale":"FR",
         "label":"French translation"
      },
      {
         "locale":"NL",
         "label":"Dutch translation"
      },
      {
         "locale":"DE",
         "label":"German translation"
      }
   ],
   "worksheetName":"Settings 2 - Worksheet",
   "filename":"settings2-output",
   "outputDir":"D:\\TEMP\\TEMP"
}
```

```bash
npx @jy95/i18n-tools export to_xlsx --settings "/absolutePath/to/settings2.json"
```

### Third format of settings.json (Include the worksheetCustomizer)

```js title="worksheetCustomizer-dynamic.js"
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
  let computedRef = `B2:${lastColumnLetter + rowCount + 2}`;

  worksheet.addConditionalFormatting({
    ref: computedRef,
    rules: [
      // cell is empty : put it in red
      {
        type: 'containsText',
        operator: 'containsBlanks',
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FF5733' },
          },
        },
        priority: 1,
      },
      // cell contains either [FR], [NL] or [DE] : put it in orange
      {
        type: 'containsText',
        operator: 'containsText',
        text: '[FR]',
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FF9633' },
          },
        },
        priority: 2,
      },
      {
        type: 'containsText',
        operator: 'containsText',
        text: '[NL]',
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FF9633' },
          },
        },
        priority: 2,
      },
      {
        type: 'containsText',
        operator: 'containsText',
        text: '[DE]',
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FF9633' },
          },
        },
        priority: 2,
      },
    ],
  });

  return worksheet;
};
```

```json title="settings3.json"
{
   "files":{
      "FR":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\fr.json",
      "NL":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\nl.json",
      "DE":"D:\\TEMP\\TEMP\\tests-for-export\\correct\\de.json"
   },
   "columns":[
      {
         "locale":"FR",
         "label":"French translation"
      },
      {
         "locale":"NL",
         "label":"Dutch translation"
      },
      {
         "locale":"DE",
         "label":"German translation"
      }
   ],
   "worksheetCustomizer":"D:\\workspace\\i18n-tools\\test\\fixtures\\export-xlsx\\worksheetCustomizer-dynamic.js",
   "worksheetName":"Settings 3 - Worksheet",
   "filename":"settings3-output",
   "outputDir":"D:\\TEMP\\TEMP"
}
```

```bash
npx @jy95/i18n-tools export to_xlsx --settings "/absolutePath/to/settings3.json"
```