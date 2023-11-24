import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storage-6f80d-default-rtdb.firebaseio.com/zustand';


const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        // const data = sessionStorage.getItem(name);

        // return data;
        try{
            const data = await fetch(`${firebaseUrl}/${name}.json`)
                .then( res => res.json());
            return JSON.stringify(data);
        
        }catch(err){
            throw err;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {

        const data = await fetch(`${firebaseUrl}/${name}.json`, {
            method:'PUT',
            body:value
        }).then( res => res.json());

        // sessionStorage.setItem(name, value);

        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        throw new Error("Function not implemented.");
    }
};

export const firebaseStorage = createJSONStorage (()=> storageApi)