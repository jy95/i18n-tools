import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { DiffExportParameters } from '../../../types/diffTypes';

export default async function (params: DiffExportParameters) {
  let filename = pathResolve(
    params.yargs.outputDir,
    `${params.yargs.filename}.json`
  );
  // KISS : just return the changes array
  return await fs.promises.writeFile(
    filename,
    JSON.stringify({
      files: params.yargs.paths,
      changes: params.changes,
    })
  );
}
