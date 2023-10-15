export const token = localStorage.getItem("accessToken");

export let userName = localStorage.getItem("userName");

export const email = localStorage.getItem("email");

/**
 * Clears all data stored in the local storage.
 */
export function clearStorage() {
    localStorage.clear();
}
