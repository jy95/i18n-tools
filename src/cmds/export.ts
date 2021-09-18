// export command
import export_xlsx from './export_cmds/export_xlsx';
import export_csv from './export_cmds/export_csv';

// named exports
export const command = 'export <command>';
export const description = 'Export i18n files into something else';

export const builder = function (y: any) {
  return (
    y
      // commandDir doesn't work very well in Typescript
      .command(export_xlsx)
      .command(export_csv)
  );
};
/* istanbul ignore next */
export const handler = function (_: any) {};

// default export
export default {
  command: command,
  description: description,
  builder: builder,
  handler: handler,
};
