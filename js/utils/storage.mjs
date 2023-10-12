export const token = localStorage.getItem("accessToken");

export let userName = localStorage.getItem("userName");

export const email = localStorage.getItem("email");


export function clearStorage() {
    localStorage.clear();
}
