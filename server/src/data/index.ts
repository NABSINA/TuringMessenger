import { readFileSync, writeFileSync, existsSync } from 'fs';
import { JSONFile } from './JSONFile.enum';

function getPath(file: JSONFile): string {
    return `data/${file}`;
}

function readJSON(file: JSONFile): any {
    if (existsSync(getPath(file))) {
        return JSON.parse(readFileSync(getPath(file), 'utf-8'));
    } else {
        throw new Error(`${getPath(file)} does not exits`);
    }
}

function writeJSON(file: JSONFile, content: any): any {
    writeFileSync(getPath(file), JSON.stringify(content));
}

function get(file: JSONFile) {
    return readJSON(file);
}

function append(file: JSONFile, object: any): boolean {
    try {
        object.createdAt = new Date();
        let content: any = {};
        if (existsSync(file)) {
            content = readJSON(file);
        }
        Object.keys(object).forEach((key: string) => {
            content[key] = object[key];
        });
        writeJSON(file, content);
        return true;
    } catch (error: any) {
        return false;
    }
}

function remove(file: JSONFile, key: string): boolean {
    try {
        let content: any = {};
        if (existsSync(file)) {
            content = readJSON(file);
        }
        delete content[key];
        writeJSON(file, content);
        return true;
    } catch (error: any) {
        return false;
    }
}

export {
    get,
    append,
    remove,
};
