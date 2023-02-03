import { writable, type Readable } from "svelte/store";
import { address } from "./address";
import { browser } from "$app/environment";

export interface UserData {
    username: string,
    token: string,
}

export interface UserStore extends Readable<UserData | null> {
    register: (username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
}

function makeUserStore(): UserStore {
    let { set, subscribe } = writable<UserData | null>(null);
    let token: string | null = null;
    let username: string | null = null;
    if (browser) {
        token = localStorage.getItem('tic-tac-toe-token');
        username = localStorage.getItem('tic-tac-toe-username');
    }
    if (token && username) set({ token: token, username: username });
    let register = async (username: string, password: string) => {
        let res = await fetch(address + "user/register",
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-type": "application/json" }
            });
    };
    let login = async (username: string, password: string) => {
        let res = await fetch(address + "user/login",
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-type": "application/json" }
            });
        let token = await res.json();

        if (token == null) {
            logout();
            if (browser) {
                localStorage.removeItem('tic-tac-toe-token');
                localStorage.removeItem('tic-tac-toe-username');
            }
            return;
        }
        if (browser) {
            localStorage.setItem('tic-tac-toe-token', token);
            localStorage.setItem('tic-tac-toe-username', username);
        }
        set({ username: username, token: token });

    };
    let logout = () => {
        set(null);
        if (browser) {
            localStorage.removeItem('tic-tac-toe-token');
            localStorage.removeItem('tic-tac-toe-username');
        }
    };
    return { subscribe, register, login, logout };
}

export const userStore = makeUserStore();