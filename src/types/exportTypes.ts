// reuse yargs Argv type
import { Argv } from 'yargs';

// Yargs export arguments
export interface CommonExportArguments extends Argv {
  files: {
    [x: string]: string;
  };
  filename: string;
  outputDir: string;
}
// Yargs export arguments for TO_XLSX command
export interface XLSXExportArguments extends CommonExportArguments {
  columns: {
    locale: string;
    label: string;
  }[];
  worksheetName: string;
  worksheetCustomizer?: string;
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

// Result after extract of multiple i18n files
export type I18N_Merged_Data = {
  technical_key: string;
  labels: {
    [locale: string]: string;
  };
}[];
