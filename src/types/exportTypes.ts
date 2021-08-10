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
  exportColumns: {
    locale: string;
    label: string;
  }[];
  worksheetName: string;
}

// Result after extract of multiple i18n files
export type I18N_Merged_Data = {
  technical_key: string;
  labels: {
    [locale: string]: string;
  };
}[];
