import { DiffExportParameters } from '../../../types/diffTypes';
import toJSON from './toJSON';

export default async function (params: DiffExportParameters) {
  switch (params.yargs.outputFormat) {
    case 'JSON':
      return toJSON(params);
    /* istanbul ignore next */
    default:
      return Promise.reject('Strategy not implemented');
  }
}
