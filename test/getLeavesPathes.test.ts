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

describe('[commons - getLeavesPathes]', () => {
  test.each(PATH_SCENARIOS)(
    '%s',
    async (_title: string, obj: any, expectedArray: string[]) => {
      const paths = getLeavesPathes(obj);
      expect(paths.sort()).toEqual(expectedArray.sort());
    }
  );
});
