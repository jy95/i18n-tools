// For typing
import {Argv} from "yargs";

// named exports
export const command = "export <command>";
export const description = "Export i18n files into something else";

export const builder = function (y : Argv) {
    return y
        .commandDir("export_cmds", {
            extensions: process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js'],
            // exclude merge_i18n_files.ts
            exclude: (path) => /export_commons\.(?:t|j)s/.test(path)
        });
}
export const handler = function (_ : Argv) {};