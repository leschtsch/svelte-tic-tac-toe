import { validate_each_argument } from "svelte/internal";
import { readable, writable, type Readable } from "svelte/store";
import { address } from "./address";
import { userStore, type UserData } from "./userStore";

type Cell = "X" | "O";

export interface GameData {
    size: number,
    criteria: number,
    field: Array<Array<Cell>>,
    currentPlayer: Cell,
    winner: Cell,
    draw: boolean,
}

export interface GameStore extends Readable<GameData> {
    reset: (size: number, criteria: number) => void,
    turn: (x: number, y: number) => void,
}

export function makeGameStore(gameId: string | undefined = undefined,): GameStore {
    let user: UserData | undefined = undefined;
    let authHeader:string = '';
    userStore.subscribe((value) => {
        user = value;        
        if (!user) return;
        authHeader = 'Bearer ' + user.token;
    });
    let isMain = (gameId === undefined);
    let url = isMain ? address : `${address}games/${gameId}/`;



    let { set, subscribe } = writable<GameData>(undefined, (set) => {
        const interval = setInterval(async () => {
            let res = await fetch(url);
            let json = await res.json();

            if (isMain) {
                set(await json);
            } else {
                set(await json["game"]);
            }

        }, 1000);

        return () => clearInterval(interval);
    });

    let reset = async (size: number, criteria: number) => {
        if (!isMain && !user) return;
        
        let res = await fetch(url + "reset",
            {
                method: "POST",
                body: JSON.stringify({ size, criteria }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: authHeader,
                }
            });
        
    }

    let turn = async (x: number, y: number) => {
        if (!isMain && !user) return;
        
        let res = await fetch(url + "turn",
            {
                method: "POST",
                body: JSON.stringify({ x: x, y: y }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: authHeader,
                }
            });
        return
    }

    return {
        subscribe,
        reset,
        turn,
    };
}