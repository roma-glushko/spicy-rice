import Dexie from 'dexie';

export const DB_NAME = 'SpicyRiceDB'

let indexedDB = undefined

export default () => {
    if (indexedDB) {
        return indexedDB
    }

    indexedDB = new Dexie(DB_NAME);
    indexedDB.version(1).stores(
        { projects: 'id, name, description, entityCategories, sentences' }
    );

    return indexedDB
};