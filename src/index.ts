/* istanbul ignore file */
import export_xlsx from './cmds/export_cmds/export_xlsx';
import export_csv from './cmds/export_cmds/export_csv';
import import_xlsx from './cmds/import_cmds/import_xlsx';
import import_csv from './cmds/import_cmds/import_csv';
import diff from './cmds/diff';

// export commands so that users can cherry pick what they want
export { export_xlsx, export_csv, import_xlsx, import_csv, diff };

// for CJS output
export default {
  export: {
    to_xlsx: export_xlsx,
    to_csv: export_csv,
  },
  import: {
    from_xlsx: import_xlsx,
    from_csv: import_csv,
  },
  diff: diff,
};
