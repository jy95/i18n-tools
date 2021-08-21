// re export stuff for easier import
export * as EXPORT_CHECKS from "./export/index";

// Yargs parser doesn't stop when issue(s) occurs and only returns last error.
// So I need something that resolves promises sequentially and return first error
// See https://github.com/yargs/yargs/issues/1399
// See https://github.com/yargs/yargs/issues/1975

type PromiseCheck = (argv : any) => Promise<boolean | Error>;

export const resolveChecksInOrder = (checks : PromiseCheck[]) => {
    return async (argv : any) => {
        for(let check of checks) {
            try {
                let result = await check(argv);
                //console.log(`Check ${check.name} : ${result}`); // to make easier debugging in the future
                if (result !== true) {
                    return result;
                }
            } catch (error) {
                return error;
            }
        }
        return true;       
    }
}