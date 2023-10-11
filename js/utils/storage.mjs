export const token = localStorage.getItem("accessToken");

export function clearStorage() {
    localStorage.clear();
}
