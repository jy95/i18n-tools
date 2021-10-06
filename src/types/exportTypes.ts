// reuse yargs Argv type
import { Argv } from 'yargs';
// reuse exceljs Worksheet type
import { Worksheet } from 'exceljs';

// Result after extract of multiple i18n files
export type I18N_Merged_Data = {
  technical_key: string;
  labels: {
    [locale: string]: string;
  };
}[];

// Yargs export arguments
export interface CommonExportArguments extends Argv {
  files: {
    [x: string]: string;
  };
  filename: string;
  outputDir: string;
  resultsFilter?: string | ((x: I18N_Merged_Data) => I18N_Merged_Data);
  // https://github.com/jy95/i18n-tools/issues/25
  keySeparator: '.' | string | false;
}
// Yargs export arguments for TO_XLSX command
export interface XLSXExportArguments extends CommonExportArguments {
  columns: {
    locale: string;
    label: string;
  }[];
  worksheetName: string;
  worksheetCustomizer?: string | ((x: Worksheet) => Promise<Worksheet>);
}
// Yargs export arguments for TO_CSV command
export interface CSVExportArguments extends CommonExportArguments {
  columns: {
    locale: string;
    label: string;
  }[];
  delimiter: ',' | ';' | '\t' | ' ' | '|';
  rowDelimiter: string;
  quote: '"' | string;
  escape: '"' | string;
  writeBOM: boolean;
  quoteHeaders: boolean;
}
