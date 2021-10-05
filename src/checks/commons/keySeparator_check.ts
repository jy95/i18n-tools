const KEYSEPARATOR_CHECK = async (argv: any) => {
  let keySeparator = argv.keySeparator as any;
  if (keySeparator.length !== 1) {
    return new Error(`Option keySeparator should be a not-empty char`);
  } else {
    return true;
  }
};
export default KEYSEPARATOR_CHECK;
