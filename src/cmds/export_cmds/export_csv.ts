// for fs ops
import path from 'path';
import Excel from 'exceljs';

// common fct
import { merge_i18n_files, CommonExportYargsBuilder } from './export_commons';
import { parsePathToJSON } from '../../middlewares/middlewares';

// checks import
import { resolveChecksInOrder, EXPORT_CHECKS } from '../../checks/index';

// For typing
// eslint-disable-next-line
import { Argv } from "yargs";
import { CSVExportArguments, I18N_Merged_Data } from '../../types/exportTypes';

// checks for this command
const CHECKS = [...EXPORT_CHECKS.CHECKS, ...EXPORT_CHECKS.CSV.CHECKS];

// named exports
export const command = 'to_csv';
export const description = 'Export i18n files into a csv file';

// Builder for yargs
export class CsvExportYargsBuilder extends CommonExportYargsBuilder {
  addColumnsOption() {
    this.y = this.y
      .option('columns', {
        description:
          'Absolute path to a JSON array of objects, to control the columns. Example : [{ "locale": "FR", "label": "French translation" }]',
        demandOption: true,
      })
      // coerce columns into Object
      .middleware(parsePathToJSON('columns'), true);
    return this;
  }

  addDelimiterOption() {
    this.y = this.y.option('delimiter', {
      description: 'Specify an field delimiter such as | or \\t',
      choices: [',', ';', '\t', ' ', '|'],
      default: ';',
    });
    return this;
  }

  addRowDelimiterOption() {
    this.y = this.y.option('rowDelimiter', {
      description: 'Specify an alternate row delimiter (i.e \\r\\n)',
      type: 'string',
      default: '\n',
    });
    return this;
  }

  addQuoteOption() {
    this.y = this.y.option('quote', {
      description: 'String to quote fields that contain a delimiter',
      type: 'string',
      default: '"',
    });
    return this;
  }

  addEscapeOption() {
    this.y = this.y.option('escape', {
      description:
        'The character to use when escaping a value that is quoted and contains a quote character that is not the end of the field',
      type: 'string',
      default: '"',
    });
    return this;
  }

  addWriteBOMOption() {
    this.y = this.y.option('writeBOM', {
      description:
        'Set to true if you want the first character written to the stream to be a utf-8 BOM character.',
      type: 'boolean',
      default: false,
    });
    return this;
  }

  addQuoteHeadersOption() {
    this.y = this.y.option('quoteHeaders', {
      description: 'If true then all headers will be quoted',
      type: 'boolean',
      default: true,
    });
    return this;
  }
}

export const builder = function (y: Argv) {
  return (
    new CsvExportYargsBuilder(y)
      .addFilesOption()
      .addFilenameOption()
      .addOutputDirOption()
      .addSettingConfig()
      .addColumnsOption()
      .addDelimiterOption()
      .addRowDelimiterOption()
      .addQuoteOption()
      .addEscapeOption()
      .addWriteBOMOption()
      .addQuoteHeadersOption()
      .build()
      // validations
      .check(resolveChecksInOrder(CHECKS))
  );
};

export const handler = async function (argv: CSVExportArguments) {
  try {
    let data: I18N_Merged_Data = await merge_i18n_files(argv);
    const CSV_FILE = path.resolve(argv.outputDir, argv.filename + '.csv');
    await export_as_csv(CSV_FILE, argv, data);
    console.log(`${CSV_FILE} successfully written`);
    return Promise.resolve(undefined);
  } catch (/* istanbul ignore next */ err) {
    return Promise.reject(err);
  }
};

// write
async function export_as_csv(
  CSV_FILE: string,
  argv: CSVExportArguments,
  data: I18N_Merged_Data
) {
  console.log('Preparing CSV file ...');

  // prepare data
  const workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet();

  // Set up columns
  worksheet.columns = [
    { header: 'Technical Key', key: 'technical_key' },
  ].concat(
    argv.columns.map(({ label, locale }) => ({
      header: label,
      key: `labels.${locale}`,
    }))
  );

  // workaround as Exceljs doesn't support nested key
  worksheet.addRows(
    data.map((item) =>
      argv.columns.reduce(
        (acc: { [x: string]: string }, { locale }) => {
          acc[`labels.${locale}`] = item['labels'][locale] || '';
          return acc;
        },
        { technical_key: item['technical_key'] }
      )
    )
  );

  // finally write this file
  const options = {
    // https://c2fo.io/fast-csv/docs/formatting/options
    formatterOptions: {
      delimiter: argv.delimiter,
      rowDelimiter: argv.rowDelimiter,
      quote: argv.quote,
      escape: argv.escape,
      writeBOM: argv.writeBOM,
      quoteHeaders: argv.quoteHeaders,
    },
  };
  return workbook.csv.writeFile(CSV_FILE, options);
}

// default export
export default {
  command: command,
  description: description,
  builder: builder,
  handler: handler,
};
