// reuse yargs Argv type
import { Argv } from 'yargs';

// Yargs diff arguments
export interface CommonDiffArguments extends Argv {
  filename: string;
  outputDir: string;
  paths: {
    [file: string]: string | undefined;
  };
  // Diff requires at least an array of 2 items
  files: [any, any, ...any[]];
  // output format
  outputFormat: 'JSON';
  // https://github.com/jy95/i18n-tools/issues/25
  keySeparator: '.' | string;
}

// for exporter(s)
export enum ChangesOps {
  DEL = 'DELETE', // when key exists in file1 but not in file2
  ADD = 'ADD', // when key exists in file2 but not in file1
  PUT = 'REPLACED', // when key exists in both file1 & files2 but value was replaced
}
// Describe an change, done in the direction from => to
export type CommonChangeOperation = {
  key: string; // Technical key of the prop compared
  type: ChangesOps; // type of operation done
  from: string; // first file ("file1")
  to: string; // second ("file2")
};
// Describe a delete operation
export type DelOperation = CommonChangeOperation & {
  type: ChangesOps.DEL;
  oldValue: string;
};
// Describe a add operation
export type AddOperation = CommonChangeOperation & {
  type: ChangesOps.ADD;
  newValue: string;
};
// Describe a put operation
export type PutOperation = CommonChangeOperation & {
  type: ChangesOps.PUT;
  oldValue: string;
  newValue: string;
};
export type ChangeOperations = DelOperation | AddOperation | PutOperation;

// arguments for exporter
export interface DiffExportParameters {
  // yargs, to pass dynamically option(s) without re-exporting them
  yargs: CommonDiffArguments;
  // the changes that occurs between files
  changes: ChangeOperations[];
}
