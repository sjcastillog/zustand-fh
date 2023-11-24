import { StateCreator, create } from "zustand";
import { devtools, persist, } from 'zustand/middleware'
import { firebaseStorage } from "../storages/session-storage.storage";

interface PersonState {
    firstName: string;
    lastName: string;

}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

// type PersonStore = PersonState & Actions; // se puede usar asi tambien

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", unknown]]> =

    (set) => ({

        firstName: '',
        lastName: '',
        setFirstName: (value: string) => set( ({ firstName: value }), false, 'setFirstName'),
        setLastName: (value: string) => set( ({ lastName: value }), false, 'setLastName'),

    });




export const usePersonStore = create<PersonState & Actions>()(

    devtools(
        persist(storeApi, {
            storage: firebaseStorage,
            name: "person-storage"
        })
    )


);