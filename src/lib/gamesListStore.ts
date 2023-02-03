import { writable, type Readable } from "svelte/store"
import { address } from "./address";
import type { GameData } from "./gameStore";


export interface GamesListData {
    [key: string]: {
        "game": GameData,
        "x_player": String,
        "o_player": String,
    },
}

export interface GamesListStore extends Readable<GamesListData | undefined> {
}

function makeGamesListStore(): GamesListStore {
    let { set, subscribe } = writable<GamesListData | undefined>(undefined, (set) => {
        const interval = setInterval(async () => {
            let res = await fetch(address + "games");
            set(await res.json());
        }, 1000);
        return () => clearInterval(interval);
    });

    return { subscribe };
}

export const gamesListStore = makeGamesListStore();