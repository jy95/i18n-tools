// import command
import import_xlsx from './import_cmds/import_xlsx';
import import_csv from './import_cmds/import_csv';

// named exports
export const command = 'import <command>';
export const description = 'Turn a file to i18n file(s)';

export const builder = function(y: any) {
  return (
    y
      // commandDir doesn't work very well in Typescript
      .command(import_xlsx)
      .command(import_csv)
  );
};

/* istanbul ignore next */
export const handler = function(_: any) {};

// default export
export default {
  command: command,
  description: description,
  builder: builder,
  handler: handler,
};
