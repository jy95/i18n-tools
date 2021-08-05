// Yargs export arguments
export interface ExportArguments extends Argv {
    files: {
        [x: string]: string
    },
    exportColumns: {
        locale: string,
        label: string
    }[],
    format: "xlsx",
    filename: string,
    outputDir: string,
    worksheetName: string
}

// Result after extract of multiple i18n files
type I18N_Merged_Data = {
    "technical_key": string,
    "labels" : {
        [locale: string]: string
    }
}[]