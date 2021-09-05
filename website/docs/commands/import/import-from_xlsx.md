---
sidebar_position: 1
sidebar_label: import from_xlsx
---

# import from_xlsx

> Turn a xlsx file to i18n file(s)

## Command

```bash
# Display help for import from_xlsx
npx @jy95/i18n-tools import from_xlsx --help
```

## Examples

:::tip Example file

You can use this [example file](https://github.com/jy95/i18n-tools/blob/master/test/fixtures/import-xlsx/export-xlsx.xlsx?raw=true) to see an execution of this command.

:::

### First format of settings.json (Path)

```json title="columns.json"
{
    "technical_key":"Technical Key",
    "locales":{
        "FR":"French translation",
        "NL":"Dutch translation",
        "DE":"German translation"
    }
}
```

```json title="settings1.json"
{
   "input":"D:\\workspace\\i18n-tools\\test\\fixtures\\import-xlsx\\export-xlsx.xlsx",
   "columns":"D:\\TEMP\\TEMP\\tests-for-import\\correct\\columns.json",
   "locales":[
      "FR",
      "NL",
      "DE"
   ],
   "outputDir":"D:\\TEMP\\TEMP\\tests-for-import",
   "suffix":"_settings1"
}
```

```bash
npx @jy95/i18n-tools import from_xlsx --settings "/absolutePath/to/settings1.json"
```

### Second format of settings.json (Object/Array instead of Paths)

```json title="settings2.json"
{
   "input":"D:\\workspace\\i18n-tools\\test\\fixtures\\import-xlsx\\export-xlsx.xlsx",
   "columns":{
      "technical_key":"Technical Key",
      "locales":{
         "FR":"French translation",
         "NL":"Dutch translation",
         "DE":"German translation"
      }
   },
   "locales":[
      "FR",
      "NL",
      "DE"
   ],
   "outputDir":"D:\\TEMP\\TEMP\\tests-for-import",
   "suffix":"_settings2"
}
```

```bash
npx @jy95/i18n-tools import from_xlsx --settings "/absolutePath/to/settings2.json"
```