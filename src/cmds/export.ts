import { join } from "path";

// For typing
import {Argv} from "yargs";

// named exports
export const command = "export <command>";
export const description = "Export i18n files into something else";

export const builder = function (y : Argv) {
    return y
        .commandDir(join(__dirname, "export_cmds"), {
            extensions: ["js", "ts"],
            visit(commandModule) {
                return commandModule.default;
            },
            // exclude the common file
            exclude: (path) => /export_commons\.(?:t|j)s/.test(path)
        });
}
export const handler = function (_ : Argv) {};

// default export
export default {
    command : command,
    description : description,
    builder : builder,
    handler: handler
}