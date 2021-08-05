import fs, { PathLike } from "fs";
import _ from 'lodash';
import { ExportArguments, I18N_Merged_Data } from "./exportTypes"

exports = module.exports  = (argv : ExportArguments) => {
    return new Promise( (resolve, reject) => {
        Promise
            // Read files and convert them to useful obj
            .all(
                Object
                    .entries(argv.files)
                    .map(entry => readFile(entry))
            )
            // merge results
            .then(results => mergeResults(results))
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

// read file and turning into a useful array of objects
function readFile([lang, file_path] : [string, PathLike]) : Promise<I18N_Result> {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(file_path, 'utf8')
            .then(jsonData => Promise.resolve(JSON.parse(jsonData)))
            .then(json => i18n_to_result_format(json, "", lang))
            .then(result => resolve(result))
            .catch(err => reject(err));        
    });
}

// turning a i18n into a useable object for later group by
const flat = (arr: any[]) => [].concat(...arr);

// Typings
type I18N_Object = { [x: string]: string | Array<any> | I18N_Object }
type I18N_Result = {
    "technical_key": string,
    "label": string,
    "lang": string
}[]
function i18n_to_result_format(obj : I18N_Object, prefix = "", lang = "") : I18N_Result {
    return flat(
        Object
            .keys(obj)
            .map(key => {
                let val = obj[key];
                let technicalKey = `${prefix}.${key}`
                // terminal condition first
                if (_.isString(val)) {
                    return {"technical_key": technicalKey, "label": val, "lang": lang}
                } else if (_.isArray(val)) {
                    // hardly ever saw that in a i18n file but better prevent than care
                    return val.map( (item, index) => i18n_to_result_format(item, `${technicalKey}[${index}]`,lang)) 
                } else {
                    return i18n_to_result_format(val, technicalKey, lang);
                }
        })
    );
}

// merge array of {"technical_key": "...", "label": "...", "lang": "..."}
// into {"technical_key": ..., "labels": { "FR": ..., "NL": ..., "DE": ... }}
function mergeResults(results : I18N_Result[]) : Promise<I18N_Merged_Data> {
    let groupBy_technical_key = _.groupBy(flat(results), 'technical_key');

    let final_result = Object
        .keys(groupBy_technical_key)
        .sort()
        .map(key => {
            return {
                "technical_key": key, 
                "labels": groupBy_technical_key[key]
                    .reduce( (prev, curr) => {
                        prev[curr["lang"]] = curr["label"];
                        return prev;
                    }, {})
            }
        });
    return Promise.resolve(final_result);
}