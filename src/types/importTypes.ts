// reuse yargs Argv type
import { Argv } from 'yargs';

// Yargs import arguments
export interface CommonImportArguments extends Argv {
  input: string;
  outputDir: string;
  suffix: string;
  locales: string[];
  // https://github.com/jy95/i18n-tools/issues/25
  keySeparator: '.' | string | false;
}

// Yargs import arguments for FROM_XLSX command
export interface XLSXImportArguments extends CommonImportArguments {
  columns: {
    technical_key: string;
    locales: {
      [locale: string]: string;
    };
  };
  worksheetNr: number;
}

// Yargs import arguments for FROM_CSV command
export interface CSVImportArguments extends CommonImportArguments {
  columns: {
    technical_key: string;
    locales: {
      [locale: string]: string;
    };
  };
  delimiter: ',' | ';' | '\t' | ' ' | '|';
  quote: '"' | string;
  escape: '"' | string;
  encoding: 'utf8' | 'utf16le' | 'latin1';
}

// Result after extract of input file
export interface extractedTranslation {
  technical_key: string;
  label: string;
  locale: string;
}
