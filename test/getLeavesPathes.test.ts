import getLeavesPathes from '../src/commons/getLeavesPathes';

// scenarios for testing
const PATH_SCENARIOS: [string, any, string[]][] = [
  [
    'Simple keys',
    {
      key: 42,
      someArray: [0, 1, 2],
    },
    ['key', 'someArray[0]', 'someArray[1]', 'someArray[2]'],
  ],
  [
    'Nested object keys should work',
    {
      commons: {
        firstNestedKey: 'Hello',
        units: {
          secondNestedKey: 'World !',
        },
      },
    },
    ['commons.firstNestedKey', 'commons.units.secondNestedKey'],
  ],
  [
    'Key that starts with number(s) should be correctly handled',
    {
      commons: {
        units: {
          '5ml': 42,
        },
      },
    },
    ['commons.units.5ml'],
  ],
  [
    'Key with spaces should be correctly handled',
    {
      'Key with spaces': '42',
    },
    ['Key with spaces'],
  ],
  [
    'Nested objects inside array should be correctly handled',
    {
      someArray: [
        {
          type: 'CRITICAL',
          message: 'Fatal error',
        },
        {
          type: 'WARNING',
          message: 'Deal with syntax',
        },
      ],
    },
    [
      'someArray[0].type',
      'someArray[0].message',
      'someArray[1].type',
      'someArray[1].message',
    ],
  ],
];

// scenarios for custom separator
// Might be lazy but better to support same tests that the dot separator XD
let CUST_SEPARATOR = '_';
let expectedResult: string[][] = [
  ['key', 'someArray[0]', 'someArray[1]', 'someArray[2]'],
  [
    `commons${CUST_SEPARATOR}firstNestedKey`,
    `commons${CUST_SEPARATOR}units${CUST_SEPARATOR}secondNestedKey`,
  ],
  [`commons${CUST_SEPARATOR}units${CUST_SEPARATOR}5ml`],
  ['Key with spaces'],
  [
    `someArray${CUST_SEPARATOR}0${CUST_SEPARATOR}type`,
    `someArray${CUST_SEPARATOR}0${CUST_SEPARATOR}message`,
    `someArray${CUST_SEPARATOR}1${CUST_SEPARATOR}type`,
    `someArray${CUST_SEPARATOR}1${CUST_SEPARATOR}message`,
  ],
];
const PATH_SCENARIOS_2: [string, any, string[]][] = PATH_SCENARIOS.map(
  (entry, index) => {
    return [entry[0], entry[1], expectedResult[index]];
  }
);

// Scenarios for keySeparator is set to false
const PATH_SCENARIOS_3: [string, any, string[]][] = [
  [
    'Simple keys',
    {
      key: 42,
      verylooooogKey: 'Hello world',
    },
    ['key', 'verylooooogKey'],
  ],
  [
    'Keys with special characters',
    {
      'Hello.world !': 42,
      '$x.y_42-z~5!': 'jy95',
      '[Hello].[World]|42': 'Hello',
    },
    ['Hello.world !', '$x.y_42-z~5!', '[Hello].[World]|42'],
  ],
  [
    'Nested JSON with separator set to false - backup strategy',
    {
      lol: {
        test: {
          world: 42,
        },
      },
    },
    ['lol.test.world'],
  ],
];

describe('[commons - getLeavesPathes] dot separator', () => {
  test.each(PATH_SCENARIOS)(
    '%s',
    async (_title: string, obj: any, expectedArray: string[]) => {
      const paths = getLeavesPathes(obj);
      expect(paths.sort()).toEqual(expectedArray.sort());
    }
  );
});

describe('[commons - getLeavesPathes] custom separator', () => {
  test.each(PATH_SCENARIOS_2)(
    '%s',
    async (_title: string, obj: any, expectedArray: string[]) => {
      const paths = getLeavesPathes(obj, CUST_SEPARATOR);
      expect(paths.sort()).toEqual(expectedArray.sort());
    }
  );
});

describe('[commons - getLeavesPathes] separator set to false', () => {
  test.each(PATH_SCENARIOS_3)(
    '%s',
    async (_title: string, obj: any, expectedArray: string[]) => {
      const paths = getLeavesPathes(obj, false);
      expect(paths.sort()).toEqual(expectedArray.sort());
    }
  );
});
