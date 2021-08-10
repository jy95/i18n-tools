// export command
import export_xlsx from './export_cmds/export_xlsx';

// named exports
export const command = 'export <command>';
export const description = 'Export i18n files into something else';

export const builder = function(y: any) {
  return (
    y
      // commandDir doesn't work very well in Typescript
      .command(export_xlsx)
  );
};
export const handler = function(_: any) {};

// default export
export default {
  command: command,
  description: description,
  builder: builder,
  handler: handler,
};
