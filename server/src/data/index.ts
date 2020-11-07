import { readFileSync, writeFileSync, existsSync } from 'fs';
import { JSONFile } from './JSONFile.enum';

function getPath(file: JSONFile): string {
    return `data/${file}`;
}

function readJSON(file: JSONFile): any {
    if (existsSync(getPath(file))) {
        return JSON.parse(readFileSync(getPath(file), 'utf-8'));
    } else {
        return {};
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
        const content = readJSON(file);
        Object.keys(object).forEach((key: string) => {
            object[key].createdAt = new Date();
            content[key] = object[key];
        });
        writeJSON(file, content);
        return true;
    } catch (error: any) {
        return false;
    }
}

function update(file: JSONFile, key: string, object: any): boolean {
    try {
        const content = readJSON(file);
        content[key] = object;
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
    update,
    remove,
};
