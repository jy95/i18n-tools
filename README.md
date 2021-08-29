# @jy95/i18n-tools [![codecov](https://codecov.io/gh/jy95/i18n-tools/branch/master/graph/badge.svg?token=PQDE2R2GYR)](https://codecov.io/gh/jy95/i18n-tools)

CLI to make common operations around i18n files simpler.

## Available commands

Usage :
```bash
# Display all available commands
npx @jy95/i18n-tools --help
```

## Examples

| Description                                       | Command | settings.json |
|---------------------------------------------------|---------|---------------|
| Export several i18n files into a single xlsx file | `npx @jy95/i18n-tools export to_xlsx --settings "/absolutePath/to/settings.json"` |  [One of the examples listed here](https://github.com/jy95/i18n-tools/wiki/Examples-of-settings.json#export-to_xlsx)  |
| Convert a xlsx file into several i18n files       | `npx @jy95/i18n-tools import from_xlsx --settings "/absolutePath/to/settings.json"` | [One of the examples listed here](https://github.com/jy95/i18n-tools/wiki/Examples-of-settings.json#import-from_xlsx) |
| Compare multiple i18n files & generate a report | `npx @jy95/i18n-tools diff --settings "/absolutePath/to/settings.json"` | [One of the examples listed here](https://github.com/jy95/i18n-tools/wiki/Examples-of-settings.json#diff) |

## Contributing

* If you're unsure if a feature would make a good addition, you can always [create an issue](https://github.com/jy95/i18n-tools/issues/new) first.
* We aim for 100% test coverage. Please write tests for any new functionality or changes.
* Any API changes should be fully documented.
* Make sure your code meets our linting standards. Run `npm run lint` to check your code.
* Be mindful of others when making suggestions and/or code reviewing.