import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
    //we are creating a new database names 'contact_db which will be using version 1 of the database
    openDB('contact_db', 1, {
        //add our database schema if it has not already been initialized
        upgrade(db) {
            if(db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            //create a new object store for the data and give it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
}

export const getDb = async () => {
    //create a connection to the indexeddb database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    //create a new transaction and specify the store and data privledges
    const tx = contactDb.transaction('contacts', 'readonly');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //user the .getAll() method the get all data in the database
    const request = store.getAll();

    //get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result;
}

export const postDb = async (name, email, phone, profile) => {
    //create a connection to the database and specify the version we want to use
    const contactDb = await openDB('contact_db', 1);

    //create a new transaction and specify the store and data privledges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .add() method on the store and pass in the content
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });

    //get confirmation of the request
    const result = await request;
    console.log('Data saved to the database', result);
}

export const deleteDb = async (id) => {
    //create a connection to the indexeddb database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    //create a new transaction and specify the store and data privledges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .delete() method to get all data in the database
    const request = store.delete(id);

    //get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result?.value;
}

export const editDb = async (id, name, email, phone, profile) => {
    //create a connection to the indexeddb database and the versionw e want to use
    const contactDb = await openDB('contact_db', 1);

    //create a new transaction and specify the store and data priveledges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .put() method on the store and pass in the content
    const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });

    const result = await request;
    console.log('Database updated', result);
}