import { CommonDiffArguments, ChangesOps } from '../../types/diffTypes';
import type {
  ChangeOperations,
  CommonChangeOperation,
  AddOperation,
  DelOperation,
  PutOperation,
} from '../../types/diffTypes';

// Own methods
import getLeavesPathes from '../../commons/getLeavesPathes';
import get from '../../commons/enhancedGet';

// lodash method
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';

type fileParam = {
  keys: string[];
  file: string;
  obj: any;
};
// create an "ChangeOperation"
function createChangeOperation(
  technicalKey: string,
  op: ChangesOps,
  file1: fileParam,
  file2: fileParam,
  keySeparator: string | false
): ChangeOperations {
  // common part
  let obj: CommonChangeOperation = {
    key: technicalKey,
    type: op,
    from: file1.file,
    to: file2.file,
  };
  // specific parts
  if ([ChangesOps.DEL, ChangesOps.PUT].some((o) => o === op)) {
    (obj as DelOperation | PutOperation).oldValue = get(
      file1.obj,
      technicalKey,
      keySeparator
    );
  }
  if ([ChangesOps.ADD, ChangesOps.PUT].some((o) => o === op)) {
    (obj as AddOperation | PutOperation).newValue = get(
      file2.obj,
      technicalKey,
      keySeparator
    );
  }
  // return result
  return obj as ChangeOperations;
}

// computes changes
export default function detectChanges(
  argv: CommonDiffArguments
): ChangeOperations[] {
  let result: ChangeOperations[] = [];
  let keySeparator: string | false = argv.keySeparator;
  let operations: string[] = argv.operations;

  // Fetch keys
  let files: fileParam[] = argv.files.map((file, idx) => ({
    // like done in backupPaths function
    file: `file${idx + 1}`,
    // get leaves paths for provided file
    keys: getLeavesPathes(file),
    // object in order to access properties
    obj: file,
  }));

  // Computes pairs for comparisons
  // Given an array with [file1, file2, file3] , it would mean two pairs [file1, file2] & [file2, file3]
  let comparaison_pairs = Array.from(
    { length: files.length - 1 },
    (_, idx) => idx
  ).map((idx) => [files[idx], files[idx + 1]]);

  // Made comparisons
  for (let [file1, file2] of comparaison_pairs) {
    // Computes changes of values
    /* istanbul ignore else - No need to check all combinaisons to see that user choice is respected */
    if (operations.includes('PUT')) {
      let sameKeys = intersection(file1.keys, file2.keys);
      let modifiedKeys = sameKeys.filter(
        (key) =>
          !isEqual(
            get(file1.obj, key, keySeparator),
            get(file2.obj, key, keySeparator)
          )
      );

      result.push(
        ...modifiedKeys.map((key) =>
          createChangeOperation(key, ChangesOps.PUT, file1, file2, keySeparator)
        )
      );
    }

    // Computes deleted keys
    /* istanbul ignore else - No need to check all combinaisons to see that user choice is respected */
    if (operations.includes('DEL')) {
      result.push(
        ...difference(file1.keys, file2.keys).map((key) =>
          createChangeOperation(key, ChangesOps.DEL, file1, file2, keySeparator)
        )
      );
    }

    // Computes new keys
    /* istanbul ignore else - No need to check all combinaisons to see that user choice is respected */
    if (operations.includes('ADD')) {
      result.push(
        ...difference(file2.keys, file1.keys).map((key) =>
          createChangeOperation(key, ChangesOps.ADD, file1, file2, keySeparator)
        )
      );
    }
  }

  return result;
}
