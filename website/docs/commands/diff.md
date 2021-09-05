---
sidebar_position: 3
sidebar_label: Diff
---

# Diff 

> Compare at least two i18n files and generate a report

## Command

```bash
# Display help for diff
npx @jy95/i18n-tools diff --help
```

## Examples

### With two files

```json title="settings1.json"
{
   "filename":"diff_settings1-JSON",
   "outputDir":"D:\\TEMP\\TEMP",
   "outputFormat":"JSON",
   "files":[
      "D:\\TEMP\\TEMP\\tests-for-diff\\correct\\file1.json",
      "D:\\TEMP\\TEMP\\tests-for-diff\\correct\\file2.json"
   ]
}
```

```bash
npx @jy95/i18n-tools diff --settings "/absolutePath/to/settings1.json"
```

### With two files

```json title="settings2.json"
{
   "filename":"diff_settings2-JSON",
   "outputDir":"D:\\TEMP\\TEMP",
   "outputFormat":"JSON",
   "files":[
      "D:\\TEMP\\TEMP\\tests-for-diff\\correct\\file1.json",
      "D:\\TEMP\\TEMP\\tests-for-diff\\correct\\file2.json",
      "D:\\TEMP\\TEMP\\tests-for-diff\\correct\\file3.json"
   ]
}
```

```bash
npx @jy95/i18n-tools diff --settings "/absolutePath/to/settings2.json"
```