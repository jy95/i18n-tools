// reuse yargs Argv type
import { Argv } from 'yargs';

// Yargs import arguments
export interface CommonImportArguments extends Argv {
  input: string;
  outputDir: string;
  suffix: string;
  locales: string[];
}

// Yargs import arguments for FROM_XLSX command
export interface XLSXExportArguments extends CommonImportArguments {
  columns: {
    technical_key: string;
    locales: {
      [locale: string]: string;
    };
  };
}

// Result after extract of input file
export interface extractedTranslation {
  technical_key: string;
  label: string;
  locale: string;
}
